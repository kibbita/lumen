import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserPostDto } from './models/userPostDto';
import { UserGetDto } from './models/userGetDto';
import { getPasswordHash } from '../../utils/bcrypt.service';
import { UserQuery } from './models/userQuery';

@Injectable()
export class UsersService {
    private repository;

    constructor(private datasource: DataSource) {
        this.repository = datasource.getRepository(UserEntity);
    }

    public async createUser(entityToAdd: UserPostDto) : Promise<UserGetDto> {

        const existingUser = await this.repository.findOne({
        where: [{ email: entityToAdd.email }, { username: entityToAdd.username },],});

        if (existingUser) {
            throw new ConflictException('User with same email or username already exists',);
        }

        const userEntity = new UserEntity();
        userEntity.passwordHash = await getPasswordHash(entityToAdd.password);
        userEntity.username = entityToAdd.username;
        userEntity.email = entityToAdd.email;

        this.repository.create(userEntity);
        await this.repository.save(userEntity);

        return {
            email: userEntity.email,
            username: userEntity.username
        };
    }

    async findOne(query: UserQuery): Promise<UserEntity | null> {
        const qb = this.repository.createQueryBuilder('user');

        if (query.withPassword) {
            qb.addSelect('user.passwordHash');
        }

        if (query.id) {
            qb.andWhere('user.id = :id', { id: query.id });
        }

        if (query.username) {
            qb.andWhere('user.username = :username', { username: query.username });
        }

        if (query.email) {
            qb.andWhere('user.email = :email', { email: query.email });
        }

        return qb.getOne();
    }

}
