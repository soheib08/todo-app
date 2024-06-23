import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
export class TodoItemCreatedEvent {
  constructor(
    public itemId: string,
    public listId: string,
  ) {}
}

@EventsHandler(TodoItemCreatedEvent)
export class TodoItemCreatedEventHandler
  implements IEventHandler<TodoItemCreatedEvent>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}

  async handle(event: TodoItemCreatedEvent) {
    const foundTodoList = await this.todoListRepository.findOne(event.listId);
    foundTodoList.todoItems.push(event.itemId);

    await this.todoListRepository.updateOne(foundTodoList.id, foundTodoList);
  }
}
