import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { IPasswordService } from 'src/domain/user/interface/password-service.interface';

@Injectable()
export class PasswordService implements IPasswordService {
  constructor() {}

  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
