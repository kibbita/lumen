import { Injectable } from '@nestjs/common';
import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import Database from 'better-sqlite3';
import { AnkiDeck } from './models/anki-deck';
import { DeckEntity } from '../decks/deck.entity';
import { DeckPostDto } from '../decks/models/deckPostDto';


@Injectable()
export class AnkiService {

    async exportApkg(apkgPath: string, fileUuid: string)
    {
        const baseExtractDir = path.join(process.cwd(), 'processing');
        const extractDir = path.join(baseExtractDir, fileUuid);

        // create folder
        fs.mkdirSync(extractDir, { recursive: true });

        // unzip directly into UUID folder
        const zip = new AdmZip(apkgPath);
        zip.extractAllTo(extractDir, true);

        // 3. validate Anki structure
        const collectionPath = path.join(extractDir, 'collection.anki21');

        if (!fs.existsSync(collectionPath)) {
            throw new Error('Invalid apkg: collection.anki2 not found');
        }

        return {
            extractDir,
            collectionPath,
        };

    }

    async createEntities(decompressedPath: string){
        //Read db
        const dbPath = path.join(decompressedPath, 'collection.anki21');
        const ankiDb = new Database(dbPath, { readonly: true });

        const notes = ankiDb.prepare(`SELECT id, guid, flds, tags FROM notes`).all();

        //I guess col has always only one row...
        const colRow = ankiDb.prepare(`SELECT decks FROM col`).get() as { decks: string };

        // Models as "id" : {here the deck object}, that's why i'm using a map here :)
        const deckMap = JSON.parse(colRow.decks) as Record<string, AnkiDeck>;

        const decks: AnkiDeck[] = Object.values(deckMap);

        const createdDecs: DeckPostDto[] = [];

        decks.forEach(deck => {
            createdDecs.push({
                name: deck.name,
            })
        });

        //Todo: create decks and then notes / cards..
        console.log(createdDecs);

        //TODO: Col has only one register with all the decks then filter
    }
}
