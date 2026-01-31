import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPostDto } from './models/userPostDto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}


    @Post()
    async create(@Body() user: UserPostDto) {
    return this.service.createUser(user);
    }
}
