import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard as MyAuthGuard} from '../../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
@Module({
  providers: [AuthService,  JwtStrategy,
    // for all routes! Unless marked with @Public()
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      global:true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => (
      {
        secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' }, 
      }),

    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
