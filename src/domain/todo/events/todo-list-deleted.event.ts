import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/domain/user/interface/Iuser.repository';
export class TodoListDeletedEvent {
  constructor(
    public listId: string,
    public userId: string,
  ) {}
}

@EventsHandler(TodoListDeletedEvent)
export class TodoListDeletedEventHandler
  implements IEventHandler<TodoListDeletedEvent>
{
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
  ) {}

  async handle(event: TodoListDeletedEvent) {
    const foundUser = await this.userRepository.findOne(event.userId);

    const foundIndex = foundUser.todoLists.findIndex(
      (item) => item.toString() === event.listId.toString(),
    );
    foundUser.todoLists.splice(foundIndex, 1);

    await this.userRepository.updateOne(foundUser.id, foundUser);
  }
}
