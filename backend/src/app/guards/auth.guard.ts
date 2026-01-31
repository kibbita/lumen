import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../features/auth/models/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {

      const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

      // Extract and verify the JWT from the request header
      const payload = await this.verifyToken(request);
      request['user'] = payload; // Attach the user to the request
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

private async verifyToken(request: any): Promise<any> {
  const authHeader = request.headers.authorization ?? '';
  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedException();
  }

  return this.jwtService.verifyAsync(token);
}
}
