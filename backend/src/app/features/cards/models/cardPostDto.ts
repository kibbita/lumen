import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsHtml } from "../../../validators/html.validator";

export class CardPostDto {

    @IsString()
    @IsNotEmpty()
    @IsHtml({ message: 'backContent must be valid HTML' })

    backContent!: string;

    @IsString()
    @IsHtml({ message: 'frontContent must be valid HTML' })
    @IsNotEmpty()
    frontContent!: string;

    @IsNumber()
    @IsNotEmpty()
    deckId!: number;
}