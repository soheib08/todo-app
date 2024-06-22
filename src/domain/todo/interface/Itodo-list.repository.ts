import { IGenericRepository } from '../../generic-repository';

export interface ITodoListRepository extends IGenericRepository<TodoList> {
  findOne(id: string): Promise<TodoList>;
  createOne(entity: TodoList): Promise<TodoList>;
  updateOne(id: string, entity: Partial<TodoList>): Promise<void>;
  find(): Promise<TodoList[]>;
  deleteOne(id: string): void;
}
export const ITodoListRepository = Symbol('ITodoListRepository');
