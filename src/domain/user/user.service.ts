import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/Iuser.repository';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    const userList = await this.userRepository.find();
    return userList.find((user) => user.username === username);
  }
}
