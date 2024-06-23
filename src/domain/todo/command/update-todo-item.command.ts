import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
import { ITodoItemRepository } from '../interface/Itodo-item.repository';
import { TodoItem } from '../entity/todo-item';

export class UpdateTodoItemCommand {
  constructor(
    public id: string,
    public title: string,
    public description: string,
  ) {}
}
@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(
    @Inject(ITodoItemRepository)
    private todoItemRepository: ITodoItemRepository,
  ) {}
  async execute(command: UpdateTodoItemCommand): Promise<void> {
    const foundTodoItem = await this.todoItemRepository.findOne(command.id);
    if (!foundTodoItem) throw new NotFoundException('todo item not found');

    const update: Partial<TodoItem> = {};
    update.description = command.description;
    update.title = command.title;

    await this.todoItemRepository.updateOne(foundTodoItem.id, update);
  }
}
