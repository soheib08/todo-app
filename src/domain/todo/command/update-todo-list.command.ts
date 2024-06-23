import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';

export class UpdateTodoListCommand {
  constructor(
    public id: string,
    public title: string,
  ) {}
}
@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}
  async execute(command: UpdateTodoListCommand): Promise<void> {
    const foundTodoList = await this.todoListRepository.findOne(command.id);
    if (!foundTodoList) throw new NotFoundException('todo list not found');
    await this.todoListRepository.updateOne(foundTodoList.id, {
      title: command.title,
    });
  }
}
