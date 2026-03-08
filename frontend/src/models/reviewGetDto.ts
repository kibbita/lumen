import { ReviewRating } from "./reviewRatingDto";

export class ReviewGetDto {
  id!: number;
  sessionId!: number;
  cardId!: number;
  rating!: ReviewRating;
  reviewedAt!: Date;
}