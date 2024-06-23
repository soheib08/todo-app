import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/interface/Iuser.repository';
export class TodoListCreatedEvent {
  constructor(
    public listId: string,
    public userId: string,
  ) {}
}

@EventsHandler(TodoListCreatedEvent)
export class TodoListCreatedEventHandler
  implements IEventHandler<TodoListCreatedEvent>
{
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async handle(event: TodoListCreatedEvent) {
    const foundUser = await this.userRepository.findOne(event.userId);
    foundUser.todoLists.push(event.listId);

    await this.userRepository.updateOne(foundUser.id, foundUser);
  }
}
