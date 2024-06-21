import { IGenericRepository } from '../repository/generic-repository';
import { User } from './user';

export interface IUserRepository extends IGenericRepository<User> {
  findOne(id: string): Promise<User>;
  createOne(entity: User): Promise<User>;
  updateOne(id: string, entity: Partial<User>): Promise<void>;
  find(): Promise<User[]>;
  deleteOne(id: string): void;
}
export const IUserRepository = Symbol('IUserRepository');
