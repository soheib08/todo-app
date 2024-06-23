import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ITodoListRepository } from 'src/domain/todo/interface/Itodo-list.repository';
import { TodoList } from 'src/domain/todo/entity/todo-list';
import { TodoListModel } from './todo-list.schema';

@Injectable()
export default class TodoListRepository implements ITodoListRepository {
  constructor(
    @InjectModel('TodoList') private TodoListsModel: Model<TodoList>,
  ) {}

  public async createOne(TodoList: TodoList): Promise<TodoList> {
    const newTodoList = await this.TodoListsModel.create({
      _id: new Types.ObjectId(),
      ...TodoList,
    });
    return newTodoList;
  }

  async findOne(id: string): Promise<TodoList> {
    return this.TodoListsModel.findOne({ _id: id });
  }

  public async updateOne(id: string, data: Partial<TodoList>) {
    await this.TodoListsModel.updateOne({ _id: id }, { $set: { ...data } });
  }

  public async find() {
    return await this.TodoListsModel.find();
  }

  async deleteOne(id: string) {
    return await this.TodoListsModel.deleteOne({
      _id: id,
    });
  }

  async findOneWithTodoItems(id: string): Promise<TodoListModel> {
    const todoList = await this.TodoListsModel.findOne<TodoListModel>({
      _id: id,
    }).populate('todoItems');
    return todoList;
  }
}
