import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/entity/user';
import { IUserRepository } from 'src/domain/user/interface/Iuser.repository';
import { UserModel } from './user.schema';

@Injectable()
export default class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private usersModel: Model<User>) {}

  public async createOne(user: User): Promise<User> {
    const newUser = await this.usersModel.create({
      _id: new Types.ObjectId(),
      ...user,
    });
    return newUser;
  }

  async findOne(id: string): Promise<User> {
    return await this.usersModel.findOne({ _id: id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersModel.findOne({ username });
  }

  public async updateOne(id: string, data: Partial<User>) {
    await this.usersModel.updateOne({ _id: id }, { $set: { ...data } });
  }

  public async find() {
    return await this.usersModel.find();
  }

  async deleteOne(id: string) {
    return await this.usersModel.deleteOne({
      _id: id,
    });
  }

  async findUserWithTodoLists(id: string): Promise<UserModel> {
    return await this.usersModel
      .findOne<UserModel>({ _id: id })
      .populate('todoLists');
  }
}
