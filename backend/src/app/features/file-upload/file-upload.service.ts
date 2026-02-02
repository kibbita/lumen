import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    // 1. validate extension
    const allowedExtensions = ['.apkg'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      throw new BadRequestException('invalid file extension');
    }

    // 2. validate mimetype (loose check)
    const allowedMimeTypes = [
      'application/octet-stream',
      'application/zip',
      'application/x-zip-compressed',
      'application/x-anki',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`invalid mime type: ${file.mimetype}`);
    }

    // 3. validate size (ej: 50mb para decks grandes)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large');
    }

    // 4. generate GUID filename
    const guid = randomUUID();
    const newFileName = `${guid}${ext}`;
    const newFilePath = path.join(path.dirname(file.path), newFileName);

    return {
      message: 'Anki deck uploaded successfully',
      id: guid,
      originalName: file.originalname,
      fileName: newFileName,
      path: newFilePath,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  uploadFromBuffer(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
) {
  const id = randomUUID();
  const ext = path.extname(originalName);
  const fileName = `${id}${ext}`;

  fs.writeFileSync(
    path.join(process.cwd(), 'uploads', fileName),
    buffer
  );

  return {
    id,
    fileName,
    originalName,
    mimeType,
    size: buffer.length,
  };
}
}