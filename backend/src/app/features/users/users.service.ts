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
            id: userEntity.id,
            email: userEntity.email,
            username: userEntity.username
        };
    }

    async findOne(query: UserQuery): Promise<UserGetDto | null> {
        
        const qb = this.repository.createQueryBuilder('users');

        if (query.withPassword) {
            qb.addSelect('users.passwordHash');
        }

        if (query.id) {
            qb.andWhere('users.id = :id', { id: query.id });
        }

        if (query.username) {
            qb.andWhere('users.username = :username', { username: query.username });
        }

        if (query.email) {
            qb.andWhere('users.email = :email', { email: query.email });
        }

        const entity= await qb.getOne(); 
        if (!entity) {return null}

        return {
            id: entity?.id,
            username: entity?.username,
            email: entity?.email,
        }; 
    }

}
