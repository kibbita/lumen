import { Module } from '@nestjs/common';
import { AnkiService } from './anki.service';
import { AnkiController } from './anki.controller';
import { DecksModule } from '../decks/decks.module';
import { CardsModule } from '../cards/cards.module';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  providers: [AnkiService],
  exports: [AnkiService],
  controllers: [AnkiController],
  imports: [DecksModule, CardsModule, FileUploadModule]
})
export class AnkiModule {}
