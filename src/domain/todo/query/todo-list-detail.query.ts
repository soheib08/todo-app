import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ITodoListRepository } from '../interface/Itodo-list.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { TodoList } from '../entity/todo-list';
import { TodoListModel } from 'src/persistence/todo/todo-list.schema';

export class TodoListDetailQuery {
  constructor(public id: string) {}
}

@QueryHandler(TodoListDetailQuery)
export class TodoListDetailHandler
  implements IQueryHandler<TodoListDetailQuery>
{
  constructor(
    @Inject(ITodoListRepository)
    private todoListRepository: ITodoListRepository,
  ) {}

  async execute(query: TodoListDetailQuery) {
    const foundTodoList = (await this.todoListRepository.findOneWithTodoItems(
      query.id,
    )) as TodoListModel;
    if (!foundTodoList) throw new NotFoundException('todo list not found');

    return {
      id: foundTodoList.id,
      title: foundTodoList.title,
      userId: foundTodoList.userId,
      todoItems: foundTodoList.todoItems,
    };
  }
}
