import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { StudySessionEntity } from './study-session.entity';
import { StudySessionPostDto } from './models/studySessionPostDto';
import { ENHANCER_KEY_TO_SUBTYPE_MAP } from '@nestjs/common/constants';
import { DeckEntity } from '../decks/deck.entity';
import { StudySessionQuery } from './models/studySessionQuery';
import { StudySessionGetDto } from './models/studySessionGetDto';

@Injectable()
export class StudySessionService {

    private repository;
    constructor(private datasource: DataSource ){
        this.repository = datasource.getRepository(StudySessionEntity);
    }

    async create(entityToAdd: StudySessionPostDto){
        const deckRepository = this.datasource.getRepository(DeckEntity);
            const decks = await deckRepository.find({
            where: { id: In(entityToAdd.deckIds) }
            });

        const entity = this.repository.create({decks});

        return await this.repository.save(entity);
    }   

    async find(filters: StudySessionQuery) : Promise<StudySessionGetDto[]>{

        const qb = this.repository
        .createQueryBuilder('session')
        .leftJoinAndSelect('session.decks', 'deck')
        .leftJoinAndSelect('deck.user', 'user')
        .leftJoinAndSelect('session.reviews', 'reviews');

        if (filters.userId) {
            qb.andWhere('user.id = :userId', { userId: filters.userId });
        }

        qb.orderBy('session.startedAt', 'DESC');

        const entities = await qb.getMany();
        return entities.map(session => ({
        id: session.id,
        deckIds: session.decks.map(x => x.id),
        startedAt: session.startedAt,
        cardsStudied: session.decks.reduce((sum, deck) => sum + (deck.cards.length ?? 0), 0),
        }));
    }
}
