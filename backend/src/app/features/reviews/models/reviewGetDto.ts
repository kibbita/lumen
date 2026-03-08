import { ReviewRating } from "../review.entity";

export class ReviewGetDto {
  id!: number;
  sessionId!: number;
  cardId!: number;
  rating!: ReviewRating;
  reviewedAt!: Date;
}