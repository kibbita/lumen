import { Body, Controller, Get, Post, Query, UploadedFile } from '@nestjs/common';
import { CardPostDto } from './models/cardPostDto';
import { CardsService } from './cards.service';
import type { CardQuery } from './models/cardQuery';

@Controller('cards')
export class CardsController {

    constructor(private service: CardsService){}
    
    @Post()
    async create(@Body() entityToAdd: CardPostDto){
        return await this.service.create(entityToAdd);
    }
    
    @Get()
    async getByFilters(@Query() filters: CardQuery){
        return await this.service.getByFilters(filters);
    }

}
