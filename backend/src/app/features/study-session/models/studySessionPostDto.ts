import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class StudySessionPostDto {
      @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
    deckIds!: number[];
}