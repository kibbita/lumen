import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DeckEntity } from "../decks/deck.entity";

@Entity('cards')
export class CardEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    deckId!: number;

    @Column({ type: 'text' })
    frontContent!: string;

    @Column({ type: 'text' })
    backContent!: string;

    @ManyToOne(() => DeckEntity, deck => deck.cards, { onDelete: 'CASCADE',})
    @JoinColumn({ name: 'deck_id' })
    deck!: DeckEntity;
    }