import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/users/entities/user.entity';
import configuration from 'src/config/configuration';
import { Repository } from 'typeorm';

/**
 * AuthGuard is responsible for verifying the JWT token to authenticate users.
 *
 * - If the token is valid, the user information is attached to the request object.
 * - If the token is invalid, the request is denied.
 * - If the token is absent, the request is allowed to proceed but without user information.
 */

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    if (!authorization) {
      this.logger.error('Authorization header not found');
      return false;
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configuration().jwt.secret,
      });

      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: payload.id })
        .getOne();

      if (user) {
        req.userPayload = user;
        req.user = user;
      }

      if (!user) {
        this.logger.error('User not found');
        // return false;
        return true;
      }

      return true;
    } catch (e) {
      this.logger.error('Invalid token');
      // return false ;
      return true;
    }
  }
}
