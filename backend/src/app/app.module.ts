import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/datasource';
import { UsersModule } from './features/users/users.module';
import { CardsModule } from './features/cards/cards.module';
import { DecksModule } from './features/decks/decks.module';
import { AuthService } from './features/auth/auth.service';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './features/file-upload/file-upload.module';
import { AnkiService } from './features/anki-service/anki.service';
import { AnkiModule } from './features/anki-service/anki.module';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
      envFilePath: '.env',
    }),
    UsersModule,
    CardsModule,
    DecksModule,
    AuthModule,
    FileUploadModule,
    AnkiModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AnkiService],
})
export class AppModule {}
