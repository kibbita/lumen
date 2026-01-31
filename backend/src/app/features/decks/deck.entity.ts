import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DeckEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 120})
    name!: string;

    //Todo: review how to put user id
}