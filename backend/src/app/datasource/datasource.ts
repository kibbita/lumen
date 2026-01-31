import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { UserEntity } from '../features/users/user.entity';
import { CardEntity } from '../features/cards/card.entity';
import { DeckEntity } from '../features/decks/deck.entity';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
           type: 'sqlite',
            database: 'data/cards-app.sqlite',
            entities: defaultEntities,
            synchronize: true,
            logging: false,
          });   
          await dataSource.initialize();
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})

export class TypeOrmModule {}
export const defaultEntities = [UserEntity, CardEntity, DeckEntity]