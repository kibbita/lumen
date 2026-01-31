import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/datasource';
import { UsersModule } from './features/users/users.module';
import { CardsModule } from './features/cards/cards.module';
import { DecksModule } from './features/decks/decks.module';
import { AuthService } from './features/auth/auth.service';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [TypeOrmModule, UsersModule, CardsModule, DecksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
