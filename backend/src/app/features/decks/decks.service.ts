import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DeckEntity } from './deck.entity';
import { DeckPostDto } from './models/deckPostDto';
import { DeckGetDto } from './models/deckGetDto';
import { DeckQuery } from './models/deckQuery';

@Injectable()
export class DecksService {

    private repository;
    constructor(private datasource: DataSource ){
        this.repository = datasource.getRepository(DeckEntity);
    }

    async create(entityToAdd: DeckPostDto){
        if (!entityToAdd.userId) throw new UnauthorizedException();

        const entity = this.repository.create({
            name: entityToAdd.name,
            user: { id: entityToAdd.userId } as DeckEntity,
        });

        this.repository.save(entity);

        return entity;
    }


    async find(query: DeckQuery): Promise<DeckGetDto[] | null> {
        
        const qb = this.repository.createQueryBuilder('decks');

        if (query.id) {
            qb.andWhere('decks.id = :id', { id: query.id });
        }

        if (query.name) {
            qb.andWhere('decks.name LIKE :name', { name: `%${query.name}%` });
        }

        if (query.userId) {
            qb.andWhere('decks.user_id = :userId', { userId: query.userId });
        }

        const entities= await qb.getMany(); 
        return entities.map(deck => ({
            name: deck.name 
        }));
    }

    
}
