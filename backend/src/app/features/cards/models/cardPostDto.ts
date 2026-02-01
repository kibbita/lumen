import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CardPostDto {

    @IsString()
    @IsNotEmpty()
    backContent!: string;

    @IsString()
    @IsNotEmpty()
    frontContent!: string;

    @IsNumber()
    @IsNotEmpty()
    deckId!: number;
}