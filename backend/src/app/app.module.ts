import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/datasource';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [TypeOrmModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
