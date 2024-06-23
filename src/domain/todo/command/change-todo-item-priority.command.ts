import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoItemRepository } from '../interface/Itodo-item.repository';
import { TodoItemPriority } from '../constant/order-item-priority';

export class ChangeTodoItemPriorityCommand {
  constructor(
    public id: string,
    public priority: TodoItemPriority,
  ) {}
}
@CommandHandler(ChangeTodoItemPriorityCommand)
export class ChangeTodoItemPriorityHandler
  implements ICommandHandler<ChangeTodoItemPriorityCommand>
{
  constructor(
    @Inject(ITodoItemRepository)
    private todoItemRepository: ITodoItemRepository,
  ) {}
  async execute(command: ChangeTodoItemPriorityCommand): Promise<void> {
    const foundTodoItem = await this.todoItemRepository.findOne(command.id);
    if (!foundTodoItem) throw new NotFoundException('todo item not found');

    await this.todoItemRepository.updateOne(foundTodoItem.id, {
      priority: command.priority,
    });
  }
}
