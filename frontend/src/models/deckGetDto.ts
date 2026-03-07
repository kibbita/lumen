import { DeckPostDto } from "./deckPostDto";

export class DeckGetDto extends DeckPostDto {
    id!: number;
    cardQuantity!: number;
}