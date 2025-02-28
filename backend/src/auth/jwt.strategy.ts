import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { validateEnvVariable } from 'src/utils/env.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: validateEnvVariable(
        process.env.JWT_ACCESS_SECRET,
        'JWT_ACCESS_SECRET',
      ),
    });
  }

  async validate(payload: IJwtPayload) {
    return { userId: payload.userId, email: payload.email };
  }
}
