import { IGenericRepository } from 'src/domain/generic-repository';
import { TodoItem } from '../entity/todo-item';

export interface ITodoItemRepository extends IGenericRepository<TodoItem> {
  findOne(id: string): Promise<TodoItem>;
  createOne(entity: TodoItem): Promise<TodoItem>;
  updateOne(id: string, entity: Partial<TodoItem>): Promise<void>;
  find(): Promise<TodoItem[]>;
  deleteOne(id: string): void;
}
export const ITodoItemRepository = Symbol('ITodoItemRepository');
