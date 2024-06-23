import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
import { ITodoItemRepository } from '../interface/Itodo-item.repository';
import { TodoItemPriority } from '../constant/order-item-priority';
import { TodoItem } from '../entity/todo-item';

export class CreateTodoItemCommand {
  constructor(
    public todoList: string,
    public title: string,
    public description: string,
    public priority: TodoItemPriority,
  ) {}
}
@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
    @Inject(ITodoItemRepository)
    private todoItemRepository: ITodoItemRepository,
  ) {}
  async execute(command: CreateTodoItemCommand): Promise<void> {
    const foundTodoList = await this.todoListRepository.findOne(
      command.todoList,
    );
    if (!foundTodoList) throw new NotFoundException('todo list not found');

    const createdItem = await this.todoItemRepository.createOne(
      new TodoItem(
        foundTodoList.id,
        command.title,
        command.description,
        command.priority,
      ),
    );
    //send event for update user entity
  }
}
