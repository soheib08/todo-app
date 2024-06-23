import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../interface/Iuser.repository';
import { title } from 'process';

export class UserDetailQuery {
  constructor(public userId: string) {}
}

@QueryHandler(UserDetailQuery)
export class UserDetailHandler implements IQueryHandler<UserDetailQuery> {
  constructor(
    @Inject(IUserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(query: UserDetailQuery) {
    const foundUser = await this.userRepository.findUserWithTodoLists(
      query.userId,
    );
    if (!foundUser) throw new NotFoundException('username not found');

    return {
      id: foundUser.id,
      username: foundUser.username,
      todoLists: foundUser.todoLists.map((item) => {
        return {
          id: item.id,
          title: item.title,
          todoItems: item.todoItems,
        };
      }),
    };
  }
}
