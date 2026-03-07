import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile } from '@nestjs/common';
import { CardPostDto } from './models/cardPostDto';
import { CardsService } from './cards.service';
import type { CardQuery } from './models/cardQuery';
import { CardPutDto } from './models/cardPutDto';

@Controller('cards')
export class CardsController {

    constructor(private service: CardsService){}
    
    @Post()
    async create(@Body() entityToAdd: CardPostDto){
        return await this.service.create(entityToAdd);
    }

    @Put()
    async modify(@Body() entityToModify: CardPutDto){
        return await this.service.updateCard(entityToModify.id, entityToModify);
    }
    
    @Get()
    async getByFilters(@Query() filters: CardQuery){
        return await this.service.getByFilters(filters);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const cardId = Number(id);
        return await this.service.getById(cardId);
    }

}
