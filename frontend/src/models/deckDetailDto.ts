import { CardGetDto } from "./cardGetDto";
import { DeckGetDto } from "./deckGetDto";

export class DeckDetailDto extends DeckGetDto {
    cards: CardGetDto[] = [];
}