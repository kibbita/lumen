export class StudySessionGetDto {
  id!: number;
  deckIds!: number[];

  startedAt!: Date;

  cardsStudied!: number;
}