import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudySessionEntity } from "../study-session/study-session.entity";
import { CardEntity } from "../cards/card.entity";

export enum ReviewRating {
  VERY_HARD = 'very_hard',
  HARD = 'hard',
  EASY = 'easy',
  VERY_EASY = 'very_easy',
}

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => StudySessionEntity, (session) => session.reviews)
  session!: StudySessionEntity;

  @ManyToOne(() => CardEntity)
  card!: CardEntity;

  @Column({
    type: 'text',
    enum: ReviewRating,
  })
  rating!: ReviewRating;
  
  @Column()
  correctAnswer?: boolean;

  @CreateDateColumn()
  reviewedAt!: Date;
}