import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from 'src/domain/user/interface/jwt.service.interface';

@Injectable()
export class UserJwtService implements IJwtService {
  constructor(private jwtService: JwtService) {}

  async verifyToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token);
    return payload;
  }

  async generateToken(payload: string): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
