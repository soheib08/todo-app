import { TodoListModel } from 'src/persistence/todo/todo-list.schema';
import { IGenericRepository } from '../../generic-repository';
import { TodoList } from '../entity/todo-list';

export interface ITodoListRepository extends IGenericRepository<TodoList> {
  findOne(id: string): Promise<TodoList>;
  createOne(entity: TodoList): Promise<TodoList>;
  updateOne(id: string, entity: Partial<TodoList>): Promise<void>;
  find(): Promise<TodoList[]>;
  deleteOne(id: string): void;
  findOneWithTodoItems(id: string): Promise<TodoListModel>;
}
export const ITodoListRepository = Symbol('ITodoListRepository');
