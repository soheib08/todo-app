import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { TodoItemModel } from './todo-item.schema';

@Schema({ id: true, timestamps: true })
export class TodoListModel {
  id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'TodoItem' }] })
  todoItems: TodoItemModel[];
}

export type TodoListDocument = HydratedDocument<TodoListModel>;
export const TodoListSchema = SchemaFactory.createForClass(TodoListModel).set(
  'versionKey',
  false,
);

TodoListSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
