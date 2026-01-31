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

@Module({
  imports: [TypeOrmModule,    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
      envFilePath: '.env',
    }), UsersModule, CardsModule, DecksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
