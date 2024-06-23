import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ITodoItemRepository } from 'src/domain/todo/interface/Itodo-item.repository';
import { TodoListModel } from './todo-list.schema';
import { TodoItem } from 'src/domain/todo/entity/todo-item';

@Injectable()
export default class TodoItemRepository implements ITodoItemRepository {
  constructor(
    @InjectModel('TodoItem') private TodoItemsModel: Model<TodoItem>,
  ) {}

  public async createOne(TodoItem: TodoItem): Promise<TodoItem> {
    const newTodoItem = await this.TodoItemsModel.create({
      _id: new Types.ObjectId(),
      ...TodoItem,
    });
    return newTodoItem;
  }

  async findOne(id: string): Promise<TodoItem> {
    return this.TodoItemsModel.findOne({ _id: id });
  }

  public async updateOne(id: string, data: Partial<TodoItem>) {
    await this.TodoItemsModel.updateOne({ _id: id }, { $set: { ...data } });
  }

  public async find() {
    return await this.TodoItemsModel.find();
  }

  async deleteOne(id: string) {
    return await this.TodoItemsModel.deleteOne({
      _id: id,
    });
  }
}
