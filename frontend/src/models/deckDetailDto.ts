import { CardGetDto } from "./cardGetDto";
import { DeckGetDto } from "./deckGetDto";
import { TagGetDto } from "./tagGetDto";

export class DeckDetailDto extends DeckGetDto {
    cards: CardGetDto[] = [];
}