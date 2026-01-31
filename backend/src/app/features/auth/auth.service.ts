import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './models/auth-response';
import { UserQuery } from '../users/models/userQuery';
import { LoginDto } from './models/loginDto';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){
    }

  async logIn(loginDto: LoginDto): Promise<AuthResponse | null> {
    const user = await this.usersService.findOne({username: loginDto.username} as UserQuery);

    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      return null;
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}
  