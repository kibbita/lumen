import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService){}

    @Post()
    async login(@Body() username: string, password: string) {
        return this.service.logIn(username,password);
    }
}
