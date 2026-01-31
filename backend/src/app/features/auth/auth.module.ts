import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard as MyAuthGuard} from '../../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
@Module({
  providers: [AuthService,  
    // for all routes! Unless marked with @Public()
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.TZ, //TODO: change,
      signOptions: { expiresIn: '1h' }, // TODO: CHANGE
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
