import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { CardPostDto } from "./cardPostDto";

export class CardPutDto extends CardPostDto {
    @IsNumber()
    @IsNotEmpty()
    id!: number;
}