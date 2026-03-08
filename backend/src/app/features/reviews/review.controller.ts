import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewPostDto } from './models/reviewPostDto';

@Controller('reviews')
export class ReviewController {

    constructor(private service: ReviewService){}

    @Post()
    async create(@Body() entityToAdd: ReviewPostDto){
        return await this.service.create(entityToAdd);
    }
}
