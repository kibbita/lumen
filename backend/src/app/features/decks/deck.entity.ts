import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "../cards/card.entity";
import { UserEntity } from "../users/user.entity";
import { TagEntity } from "../tags/tag.entity";

@Entity('decks')
export class DeckEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 120})
    name!: string;

    @OneToMany(() => CardEntity, card => card.deck)
    cards!: CardEntity[];

    @OneToMany(() => TagEntity, tag => tag.deck)
    tags!: TagEntity[];

    @ManyToOne(() => UserEntity, user => user.decks, { onDelete: 'CASCADE',})
        @JoinColumn({ name: 'user_id' })
        user!: UserEntity;
}