import { TagGetDto } from "../../tags/models/tagGetDto";

export class DeckGetDto {
    name!: string;
    id!: number;
    cardQuantity!:number;
    tags: TagGetDto[] = [];
}