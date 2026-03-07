import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { DeckPostDto } from './models/deckPostDto';
import { DecksService } from './decks.service';
import type { DeckQuery } from './models/deckQuery';

@Controller('decks')
export class DecksController {

    constructor(private readonly service: DecksService){}
    
    @Post()
    async create(@Body() entityToAdd: DeckPostDto, @Req() req: any){
        entityToAdd.userId = req.user.sub;
        return await this.service.create(entityToAdd); 
    }

    @Get()
    async getByFilters(@Query() filters: DeckQuery){
        return await this.service.find(filters);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const deckId = Number(id);
        return await this.service.findById(deckId);
    }
}
