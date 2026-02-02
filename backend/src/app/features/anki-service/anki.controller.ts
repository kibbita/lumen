import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AnkiService } from './anki.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('anki')
export class AnkiController {

    constructor(private service: AnkiService){}

    @UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }),
)
    @Post('import')
    async ImportAnkiFile(@UploadedFile() file: Express.Multer.File ,@Req() req: any){
        const userId = req.user.sub;
        await this.service.importAnkiFile(file, userId);
    }
}
