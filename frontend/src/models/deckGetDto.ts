import { DeckPostDto } from "./deckPostDto";
import { TagGetDto } from "./tagGetDto";

export class DeckGetDto extends DeckPostDto {
    id!: number;
    cardQuantity!: number;
    tags: TagGetDto[] = [];
}