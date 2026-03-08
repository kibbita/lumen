import { ReviewRating } from "./reviewRatingDto";

export class ReviewPostDto {
id!: number;
  sessionId!: number;
  cardId!: number;
  rating!: ReviewRating;
  reviewedAt!: Date;
}