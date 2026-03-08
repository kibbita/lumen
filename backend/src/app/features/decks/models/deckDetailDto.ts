import { CardEntity } from "../../cards/card.entity";

import { DeckGetDto } from "./deckGetDto";

export class DeckDetailDto extends DeckGetDto {
    cards: CardEntity[] = [];
}