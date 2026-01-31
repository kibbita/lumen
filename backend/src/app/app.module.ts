import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/datasource';
import { UsersModule } from './features/users/users.module';
import { CardsModule } from './features/cards.module';
import { CardsModule } from './features/cards/cards.module';
import { DecksModule } from './features/decks/decks.module';

@Module({
  imports: [TypeOrmModule, UsersModule, CardsModule, DecksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
