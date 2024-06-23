import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
import { TodoList } from '../entity/todo-list';
import { TodoListCreatedEvent } from '../events/todo-list-created.event';

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
    private eventBus: EventBus,
  ) {}
  async execute(command: CreateTodoListCommand): Promise<void> {
    const createdTodoList = await this.todoListRepository.createOne(
      new TodoList(command.userId, command.title),
    );
    this.eventBus.publish(
      new TodoListCreatedEvent(createdTodoList.id, createdTodoList.userId),
    );
  }
}
