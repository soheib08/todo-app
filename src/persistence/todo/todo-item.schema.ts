import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TodoListModel } from './todo-list.schema';
import { TodoItemPriority } from 'src/domain/todo/constant/order-item-priority';

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
    enum: TodoItemPriority,
  })
  priority: TodoItemPriority;
}

export type TodoItemDocument = HydratedDocument<TodoItemModel>;
export const TodoItemSchema = SchemaFactory.createForClass(TodoItemModel).set(
  'versionKey',
  false,
);

TodoItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
