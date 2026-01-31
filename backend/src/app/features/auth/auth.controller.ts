import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './models/public.decorator';
import { LoginDto } from './models/loginDto';

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService){}

    @Public()
    @Post()
    async login(@Body() loginDto: LoginDto) {
        const token = await this.service.logIn(loginDto);
        if (!token) throw new UnauthorizedException();
        return token;
    }
}
