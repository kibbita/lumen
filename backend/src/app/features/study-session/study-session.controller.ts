import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { StudySessionPostDto } from './models/studySessionPostDto';
import { StudySessionService } from './study-session.service';
import type { StudySessionQuery } from './models/studySessionQuery';

@Controller('study-sessions')
export class StudySessionController {

    constructor(private service: StudySessionService){}
    @Post()
    async create(@Body() entityToAdd: StudySessionPostDto){
        return await this.service.create(entityToAdd); 
    }

    @Get()
    async getByFilters(@Query() filters: StudySessionQuery, @Req() req: any){
        filters.userId = req.user.sub;
        return await this.service.find(filters);
    }
}
