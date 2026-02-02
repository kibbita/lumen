import { Injectable } from '@nestjs/common';
import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import Database from 'better-sqlite3';
import { AnkiDeck } from './models/anki-deck';
import { DeckPostDto } from '../decks/models/deckPostDto';
import { DecksService } from '../decks/decks.service';
import { CardsService } from '../cards/cards.service';
import { CardPostDto } from '../cards/models/cardPostDto';
import { randomUUID } from 'crypto';
import { FileUploadService } from '../file-upload/file-upload.service';
import mime from 'mime';


@Injectable()
export class AnkiService {

    constructor(private decksService: DecksService, private cardsService: CardsService, private fileuploadService: FileUploadService){}


    public async importAnkiFile(apkgFile: Express.Multer.File,userId: number){
        this.fileuploadService.handleFileUpload(apkgFile);

        const {extractDir} = await this.exportApkg(apkgFile.path, apkgFile.filename);

        await this.createEntities(extractDir,userId)
    }
    
    private async exportApkg(apkgPath: string, fileUuid: string)
    {
        const baseExtractDir = path.join(process.cwd(), 'processing');
        const extractDir = path.join(baseExtractDir, fileUuid);

        // create folder
        fs.mkdirSync(extractDir, { recursive: true });

        // unzip directly into UUID folder
        const zip = new AdmZip(apkgPath);
        zip.extractAllTo(extractDir, true);

        // validate Anki structure
        const collectionPath = path.join(extractDir, 'collection.anki21');

        if (!fs.existsSync(collectionPath)) {
            throw new Error('Invalid apkg: collection.anki21 not found');
        }

        return {
            extractDir,
            collectionPath,
        };

    }

        private async createEntities(decompressedPath: string, userId: number) {

        const dbPath = path.join(decompressedPath, 'collection.anki21');
        const ankiDb = new Database(dbPath, { readonly: true });

        try {
            // Decks data
            const colRow = ankiDb.prepare('SELECT decks FROM col').get() as { decks: string };
            const deckMap = JSON.parse(colRow.decks) as Record<string, AnkiDeck>;

            // Media json
            const mediaJsonPath = path.join(decompressedPath, 'media');
            const mediaDir = path.join(decompressedPath, 'media');

            const mediaMap = JSON.parse(
            fs.readFileSync(mediaJsonPath, 'utf-8')
            ) as Record<string, string>;

            // build media replacing map
            const mediaReplaceMap: Record<string, string> = {};

            for (const [mediaId, originalName] of Object.entries(mediaMap)) {
            const binaryPath = path.join(mediaDir, mediaId);
            if (!fs.existsSync(binaryPath)) continue;

            const ext = path.extname(originalName).toLowerCase();
            const newFileName = `${randomUUID()}${ext}`;

            //File upload
            const buffer = fs.readFileSync(binaryPath);

            this.fileuploadService.uploadFromBuffer(
            buffer,
            newFileName,
            mime.lookup(originalName) || 'application/octet-stream');
            
            mediaReplaceMap[originalName] = newFileName;
            }

            // query
            const notesQuery = ankiDb.prepare(`
            SELECT
                c.id AS cardId,
                c.did AS deckId,
                n.flds,
                n.tags
            FROM cards c
            JOIN notes n ON c.nid = n.id
            WHERE c.did = @deckId
            `);

            // create entities
            for (const [deckId, deck] of Object.entries(deckMap)) {

            const createdDeck = await this.decksService.create({
                name: deck.name,
                userId,
            });

            const rows = notesQuery.all({ deckId: Number(deckId) }) as any[];

            for (const row of rows) {
                const fields = row.flds.split('\x1f');

                const card: CardPostDto = {
                deckId: createdDeck.id,
                frontContent: this.replaceMedia(fields[0], mediaReplaceMap),
                backContent: this.replaceMedia(fields[1], mediaReplaceMap),
                };

                await this.cardsService.create(card);
            }
            }

        } finally {
            ankiDb.close();
        }
        }

    private replaceMedia(html: string, map: Record<string, string>) {
        let result = html;

        for (const [oldName, newName] of Object.entries(map)) {
            result = result.replaceAll(oldName, newName);
        }

  return result;
}
}
