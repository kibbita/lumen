import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {

      // Extract and verify the JWT from the request header
      const payload = await this.verifyToken(request);
      request['user'] = payload; // Attach the user to the request
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async verifyToken(request: Request): Promise<any> {
    const authHeader = request.headers.get('authorization')|| '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    // Verify the token using the JwtService and return the payload
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }
}
