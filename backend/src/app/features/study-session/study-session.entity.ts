import { CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReviewEntity } from "../reviews/review.entity";
import { DeckEntity } from "../decks/deck.entity";

@Entity('study-sessions')
export class StudySessionEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => ReviewEntity, (review) => review.session)
    reviews!: ReviewEntity[];

    @CreateDateColumn()
    startedAt!: Date;

    @ManyToMany(() => DeckEntity)
    @JoinTable()
    decks!: DeckEntity[];
}