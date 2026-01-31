import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './models/auth-response';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService){
    }

  async logIn(username: string, unhashedPassword: string): Promise<AuthResponse | null> {
    const user = await this.usersService.findOne({username});

    if (!user || !(await bcrypt.compare(unhashedPassword, user.passwordHash))) {
      return null;
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}
