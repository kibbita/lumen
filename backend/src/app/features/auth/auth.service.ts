import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './models/auth-response';
import { LoginDto } from './models/loginDto';
import { DataSource } from 'typeorm';
import { UserEntity } from '../users/user.entity';
@Injectable()
export class AuthService {
    constructor(private datasource: DataSource, private jwtService: JwtService){
    }

    userRepository = this.datasource.getRepository(UserEntity);

  async logIn(loginDto: LoginDto): Promise<AuthResponse | null> {

    const user = await this.userRepository.findOneBy({username: loginDto.username})

    if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      return null;
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}
  