import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
export class TodoItemDeletedEvent {
  constructor(
    public itemId: string,
    public listId: string,
  ) {}
}

@EventsHandler(TodoItemDeletedEvent)
export class TodoItemDeletedEventHandler
  implements IEventHandler<TodoItemDeletedEvent>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}

  async handle(event: TodoItemDeletedEvent) {
    const foundTodoList = await this.todoListRepository.findOne(event.listId);
    const foundIndex = foundTodoList.todoItems.findIndex(
      (item) => item.toString() === event.itemId.toString(),
    );
    foundTodoList.todoItems.splice(foundIndex, 1);

    await this.todoListRepository.updateOne(foundTodoList.id, foundTodoList);
  }
}
