import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeckEntity } from "../decks/deck.entity";

@Entity()
export class CardEntity {
      @PrimaryGeneratedColumn()
      id!: number;

      @Column()
      deckId!: number;

        @ManyToOne(() => DeckEntity, deck => deck.cards, { onDelete: 'CASCADE',})
        @JoinColumn({ name: 'deck_id' })
        deck!: DeckEntity;
    }