import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeckEntity } from "../decks/deck.entity";

@Entity('tags')
export class TagEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 120})
    name!: string;

    @ManyToOne(() => DeckEntity, deck => deck.tags, { onDelete: 'CASCADE',})
        @JoinColumn({ name: 'deck_id' })
        deck!: DeckEntity;
}