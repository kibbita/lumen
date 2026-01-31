import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "../cards/card.entity";
import { UserEntity } from "../users/user.entity";

@Entity()
export class DeckEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 120})
    name!: string;

    @OneToMany(() => CardEntity, card => card.deck)
    cards!: CardEntity[];

    @ManyToOne(() => UserEntity, user => user.decks, { onDelete: 'CASCADE',})
        @JoinColumn({ name: 'user_id' })
        user!: UserEntity;
}