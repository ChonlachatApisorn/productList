import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt-user') {
  constructor() {
    super();
  }

  canActive(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.header.authorization;
    if (!token) {
      throw new UnauthorizedException('no token');
    }
    return super.canActivate(context);
  }
}
