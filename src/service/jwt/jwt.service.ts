import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/domain/user/interface/jwt.service.interface';
import { DecodedUser } from 'src/domain/user/interface/user.interface';

@Injectable()
export class UserJwtService implements IJwtService {
  constructor(private jwtService: JwtService) {}

  verifyToken(token: string): DecodedUser {
    const payload = this.jwtService.verify(token);
    return payload;
  }

  generateToken(payload: string): string {
    return this.jwtService.sign({ userId: payload });
  }
}
