import { Injectable } from '@nestjs/common';
import { IJwtService } from 'src/domain/user/interface/jwt.service.interface';

@Injectable()
export class UserJwtService implements IJwtService {
  constructor() {}

  async verifyToken(token: string): Promise<boolean> {
    return true;
  }

  async generateToken(payload: string): Promise<string> {
    return '';
  }
}
