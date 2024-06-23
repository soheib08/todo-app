import { IGenericRepository } from 'src/domain/generic-repository';
import { User } from '../entity/user';
import { UserModel } from 'src/persistence/user/user.schema';

export interface IUserRepository extends IGenericRepository<User> {
  findOne(id: string): Promise<User>;
  createOne(entity: User): Promise<User>;
  updateOne(id: string, entity: Partial<User>): Promise<void>;
  find(): Promise<User[]>;
  deleteOne(id: string): void;
  findOneByUsername(username: string): Promise<User>;
  findUserWithTodoLists(id: string): Promise<UserModel>;
}
export const IUserRepository = Symbol('IUserRepository');
