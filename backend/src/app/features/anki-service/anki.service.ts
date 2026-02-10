import { Injectable } from '@nestjs/common';
import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import Database from 'better-sqlite3';
import { AnkiDeck } from './models/anki-deck';
import { DecksService } from '../decks/decks.service';
import { CardsService } from '../cards/cards.service';
import { CardPostDto } from '../cards/models/cardPostDto';
import { FileUploadService } from '../file-upload/file-upload.service';
import mime from 'mime';

@Injectable()
export class AnkiService {
  constructor(
    private decksService: DecksService,
    private cardsService: CardsService,
    private fileuploadService: FileUploadService
  ) {}

  public async importAnkiFile(apkgFile: Express.Multer.File, userId: number) {

    //Upload anki file to server
    this.fileuploadService.handleFileUpload(apkgFile);

    const { extractDir } = await this.unzipApkg(apkgFile.path,apkgFile.filename);

    await this.createEntities(extractDir, userId);

    this.deleteApkgFiles(extractDir);
  }

  private async unzipApkg(apkgPath: string, fileUuid: string) {
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
      const colRow = ankiDb.prepare('SELECT decks FROM col').get() as {
        decks: string;
      };
      const deckMap = JSON.parse(colRow.decks) as Record<string, AnkiDeck>;

      // obatain notes
      const notesQuery = ankiDb.prepare(`SELECT c.id AS cardId, c.did AS deckId, n.flds, n.tags
            FROM cards c JOIN notes n ON c.nid = n.id WHERE c.did = @deckId`);

    const mediaReplaceMap = this.decompressMediaFile(decompressedPath);
    
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

  private decompressMediaFile(decompressedFilePath: string){
      // Media json
      const mediaJsonPath = path.join(decompressedFilePath, 'media');

      const mediaMap = JSON.parse(fs.readFileSync(mediaJsonPath, 'utf-8')) as Record<string, string>;

      // build media replacing map
      const mediaReplaceMap: Record<string, string> = {};

      for (const [mediaId, originalName] of Object.entries(mediaMap)) {
        const binaryPath = path.join(decompressedFilePath, mediaId);
        if (!fs.existsSync(binaryPath)) continue;

        //File upload
        const buffer = fs.readFileSync(binaryPath);

        const fileUploaded = this.fileuploadService.uploadFromBuffer(buffer,originalName,mime.lookup(originalName) || 'application/octet-stream');

        mediaReplaceMap[originalName] = fileUploaded.fileName;
      }

      return mediaReplaceMap;
  }
  
private replaceMedia(html: string, map: Record<string, string>) {
  let result = html;

  const BASE_URL = process.env.PUBLIC_URL ?? 'http://localhost:3000';

  // 1️⃣ NORMALIZAR HTML DE ANKI (saca el backslash)
  result = result.replace(/\\</g, '<');

  // 2️⃣ Reemplazar nombres originales por los nuevos filenames
  for (const [oldName, newName] of Object.entries(map)) {
    result = result.replaceAll(oldName, newName);
  }

  // 3️⃣ Normalizar <img src="..."> a URL absoluta de la API
  result = result.replace(
    /<img\s+[^>]*src="([^"]+)"/g,
    (match, src) => {
      // ya es URL absoluta
      if (src.startsWith('http')) {
        return match;
      }

      // si venia como /uploads/xxx.jpg
      if (src.startsWith('/uploads/')) {
        return match.replace(
          `src="${src}"`,
          `src="${BASE_URL}${src}"`
        );
      }

      // si venia solo como filename.jpg
      return match.replace(
        `src="${src}"`,
        `src="${BASE_URL}/uploads/${src}"`
      );
    }
  );

  return result;
}




private deleteApkgFiles(unzipperdFolder: string) {
  const uploadsPath = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadsPath)) {
    return;
  }

  const files = fs.readdirSync(uploadsPath);

  for (const file of files) {
    if (file.endsWith(".apkg")) {
      const fullPath = path.join(uploadsPath, file);
      fs.unlinkSync(fullPath);
    }
  }

    fs.rmSync(unzipperdFolder, { recursive: true, force: true });
}
}
