import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Like } from "typeorm";
import { TagEntity } from "./tag.entity";
import { TagPostDto } from "./models/tagPostDto";
import { DeckEntity } from "../decks/deck.entity";
import { TagQuery } from "./models/tagQuery";
import { TagGetDto } from "./models/tagGetDto";

@Injectable()
export class TagsService {
private repository;
constructor(private datasource: DataSource ){
    this.repository = datasource.getRepository(TagEntity);
}

async create(entityToAdd: TagPostDto){
    const entity = this.repository.create({
        name: entityToAdd.name,
        deck: {id: entityToAdd.deckId} as DeckEntity,
    });

    return await this.repository.save(entity);
}


async find(query: TagQuery): Promise<TagGetDto[]> {
  const qb = this.repository
    .createQueryBuilder('tag')
    .leftJoinAndSelect('tag.deck', 'deck')
    .leftJoinAndSelect('deck.user', 'user');

  if (query.id) {
    qb.andWhere('tag.id = :id', { id: query.id });
  }

  if (query.name) {
    qb.andWhere('tag.name ILIKE :name', { name: `%${query.name}%` });
  }

  if (query.deckId) {
    qb.andWhere('deck.id = :deckId', { deckId: query.deckId });
  }

  if (query.userId) {
    qb.andWhere('user.id = :userId', { userId: query.userId });
  }

  qb.groupBy('tag.name')
    .addGroupBy('tag.id')
    .addGroupBy('deck.id');

const entities = await this.repository.find({
  where: {
    ...(query.id && { id: query.id }),
    ...(query.name && { name: Like(`%${query.name}%`) }),
  },
  relations: ['deck', 'deck.user'],
});

const unique = new Map<string, typeof entities[0]>();

for (const tag of entities) {
  if (!unique.has(tag.name)) {
    unique.set(tag.name, tag);
  }
}

return [...unique.values()].map(tag => ({
  name: tag.name,
  id: tag.id,
  deckId: tag.deck.id,
  deckName: tag.deck.name
}));
}

  async delete(id: number): Promise<boolean> {
  const entity = await this.repository.findOne({where: {id}});
  if (!entity){
    throw new NotFoundException();
  }
  await this.repository.delete(entity);
  return true;
}
}