import { Body, Controller, Delete, Get, Param, Post, Query, Req } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagPostDto } from "./models/tagPostDto";
import type { TagQuery } from "./models/tagQuery";

@Controller('tags')
export class TagsController {
    constructor(private readonly service: TagsService){}
        
    @Post()
    async create(@Body() entityToAdd: TagPostDto){
        return await this.service.create(entityToAdd); 
    }

    @Get()
    async getByFilters(@Query() filters: TagQuery, @Req() req: any ){
        filters.userId = req.user.sub;
        return await this.service.find(filters);
    }

    @Delete(':id')
    async delete(@Param('id') id: string ){
        const tagId = Number(id);
        return await this.service.delete(tagId);
    }
} 