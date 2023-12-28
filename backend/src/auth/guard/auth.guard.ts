import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extrarTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extrarTokenFromHeader(request: Request) {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }
}
