import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TodoListModel } from '../todo-list/todo-list.schema';

@Schema({ id: true, timestamps: true })
export class TodoItemModel {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TodoList' })
  todoList: TodoListModel;

  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: String,
  })
  priority: string;
}

export type UserDocument = HydratedDocument<TodoItemModel>;
export const UserSchema = SchemaFactory.createForClass(TodoItemModel).set(
  'versionKey',
  false,
);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
