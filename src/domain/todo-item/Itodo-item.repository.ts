import { IGenericRepository } from '../repository/generic-repository';

export interface ITodoItemRepository extends IGenericRepository<TodoItem> {
  findOne(id: string): Promise<TodoItem>;
  createOne(entity: TodoItem): Promise<TodoItem>;
  updateOne(id: string, entity: Partial<TodoItem>): Promise<void>;
  find(): Promise<TodoItem[]>;
  deleteOne(id: string): void;
}
export const ITodoItemRepository = Symbol('ITodoItemRepository');
