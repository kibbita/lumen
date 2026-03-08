import { IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class TagPostDto{
    @IsInt()
    deckId?: number;

    @IsString()
    @IsNotEmpty()
    name!: string;
}