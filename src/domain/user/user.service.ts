import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/Iuser.repository';
import { User } from './entity/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    const userList = await this.userRepository.find();
    return userList.find((user) => user.username === username);
  }

  async createSignInToken(userId: string): Promise<string> {
    return this.jwtService.sign({ userId });
  }
}
