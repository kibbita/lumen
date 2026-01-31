import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeckEntity } from "../decks/deck.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({unique: true})
  email!: string;

  @OneToMany(() => DeckEntity, deck => deck.user)
  decks!: DeckEntity[];

}