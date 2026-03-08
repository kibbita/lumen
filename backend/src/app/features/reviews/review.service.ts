import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewPostDto } from './models/reviewPostDto';

@Injectable()
export class ReviewService {

    private repository;
    constructor(private datasource: DataSource ){
        this.repository = datasource.getRepository(ReviewEntity);
    }

        async create(entityToAdd: ReviewPostDto){
    
            const entity = this.repository.create({
                card: {id: entityToAdd.cardId},
                correctAnswer: entityToAdd.correctAnswer,
                rating: entityToAdd.rating,
                session: {id: entityToAdd.sessionId},
                reviewedAt: Date()
            });
    
            return await this.repository.save(entity);
        }
    
}
