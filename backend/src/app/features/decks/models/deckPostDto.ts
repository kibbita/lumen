import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DeckPostDto{
    @IsOptional()
    @IsInt()
    userId?: number;

    @IsString()
    @IsNotEmpty()
    name!: string;
}