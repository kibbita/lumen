import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CardEntity } from './card.entity';
import { CardPostDto } from './models/cardPostDto';
import { CardQuery } from './models/cardQuery';
import { CardGetDto } from './models/cardGetDto';

@Injectable()
export class CardsService {
    private repository;
    constructor(private dataSource: DataSource){
        this.repository = dataSource.getRepository(CardEntity);
    }

    async create(entityToAdd: CardPostDto){
        const entity = this.repository.create({
            backContent: entityToAdd.backContent,
            frontContent: entityToAdd.frontContent,
            deck: {id: entityToAdd.deckId}
        });

        this.repository.save(entity);
        return entity;
    }

    async getByFilters(query: CardQuery): Promise<CardGetDto[] | null> {
        
        const qb = this.repository.createQueryBuilder('cards');
        qb.leftJoinAndSelect('cards.deck', 'deck');
        
        if (query.id) {
            qb.andWhere('cards.id = :id', { id: query.id });
        }

        if (query.deckId) {
            qb.andWhere('cards.deck_id = :deckId', { deckId: query.deckId });
        }

        const entities= await qb.getMany(); 
        return entities.map(card => ({
            backContent: card.backContent,
            deckId: card.deck.id,
            frontContent: card.frontContent
        }));
    }}
