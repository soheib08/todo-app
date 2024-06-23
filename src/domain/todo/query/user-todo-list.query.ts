import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';

export class UserTodoListQuery {
  constructor(public userId: string) {}
}

@QueryHandler(UserTodoListQuery)
export class UserTodoListHandler implements IQueryHandler<UserTodoListQuery> {
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}

  async execute(query: UserTodoListQuery) {}
}
