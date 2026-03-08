import { Module } from '@nestjs/common';
import { StudySessionService } from './study-session.service';
import { StudySessionController } from './study-session.controller';

@Module({
  providers: [StudySessionService],
  controllers: [StudySessionController],
  exports: [StudySessionService]
})
export class StudySessionModule {}
