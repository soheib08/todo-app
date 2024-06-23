import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
import { TodoList } from '../entity/todo-list';

export class CreateTodoListCommand {
  constructor(
    public userId: string,
    public title: string,
  ) {}
}
@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<void> {
    const createdTodoList = await this.todoListRepository.createOne(
      new TodoList(command.userId, command.title),
    );
    //send event for update user entity
  }
}
