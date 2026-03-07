import { CardEntity } from "../../cards/card.entity";
import { CardGetDto } from "../../cards/models/cardGetDto";
import { DeckGetDto } from "./deckGetDto";

export class DeckDetailDto extends DeckGetDto {
    cards: CardEntity[] = [];
}