import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPostDto } from './models/userPostDto';
import { Public } from '../auth/models/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

    @Public()
    @Post()
    async create(@Body() user: UserPostDto) {
    return this.service.createUser(user);
    }

    @Get('me')
    async getMe(@Req() req: any) {
    return await this.service.findOne({id: req.sub});
    }
}
