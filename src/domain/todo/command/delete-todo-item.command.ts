import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ITodoItemRepository } from '../interface/Itodo-item.repository';
import { TodoItemDeletedEvent } from '../events/todo-item-deleted.event';

export class DeleteTodoItemCommand {
  constructor(public id: string) {}
}
@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(
    @Inject(ITodoItemRepository)
    private todoItemRepository: ITodoItemRepository,
    private eventBus: EventBus,
  ) {}
  async execute(command: DeleteTodoItemCommand): Promise<void> {
    const foundTodoItem = await this.todoItemRepository.findOne(command.id);
    if (!foundTodoItem) throw new NotFoundException('todo item not found');

    await this.todoItemRepository.deleteOne(foundTodoItem.id);

    this.eventBus.publish(
      new TodoItemDeletedEvent(foundTodoItem.id, foundTodoItem.todoList),
    );
  }
}
