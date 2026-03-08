import { IsBoolean, isBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ReviewRating } from "../review.entity";

export class ReviewPostDto {
    @IsNumber()
    @IsNotEmpty()
    sessionId!: number;

    @IsNumber()
    @IsNotEmpty()
    cardId!: number;

    @IsNotEmpty()
    rating!: ReviewRating;

    @IsBoolean()
    correctAnswer?: boolean;
}