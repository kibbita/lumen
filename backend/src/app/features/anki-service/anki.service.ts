import { Injectable } from '@nestjs/common';
import AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';
import Database from 'better-sqlite3';


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
        const collectionPath = path.join(extractDir, 'collection.anki2');

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
        const dbPath = path.join(decompressedPath, 'collection.anki2');
        const ankiDb = new Database(dbPath, { readonly: true });


        const notes = ankiDb.prepare(`SELECT id, guid, flds, tags FROM notes`).all();
        const col = ankiDb.prepare(`SELECT decks FROM col`).all() as any;

        //TODO: Col has only one register with all the decks then filter
    }
}
