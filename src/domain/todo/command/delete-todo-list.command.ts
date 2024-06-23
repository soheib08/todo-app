import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';

export class DeleteTodoListCommand {
  constructor(public id: string) {}
}
@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}
  async execute(command: DeleteTodoListCommand): Promise<void> {
    const foundTodoList = await this.todoListRepository.findOne(command.id);
    if (!foundTodoList) throw new NotFoundException('todo list not found');
    await this.todoListRepository.deleteOne(foundTodoList.id);

    //update user entity
  }
}
