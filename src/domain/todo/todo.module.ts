import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { CreateTodoListHandler } from './command/create-todo-list.command';
import { DeleteTodoListHandler } from './command/delete-todo-list.command';
import { UpdateTodoListHandler } from './command/update-todo-list.command';
import { ChangeTodoItemPriorityHandler } from './command/change-todo-item-priority.command';
import { CreateTodoItemHandler } from './command/create-todo-item.command';
import { UpdateTodoItemHandler } from './command/update-todo-item.command';
import { DeleteTodoItemHandler } from './command/delete-todo-item.command';
import { TodoListDeletedEventHandler } from './events/todo-list-deleted.event';
import { TodoListCreatedEventHandler } from './events/todo-list-created.event';
import { TodoItemCreatedEventHandler } from './events/todo-item-created.event';
import { TodoItemDeletedEventHandler } from './events/todo-item-deleted.event';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoListDetailHandler } from './query/todo-list-detail.query';

const commandHandlers = [
  CreateTodoListHandler,
  DeleteTodoListHandler,
  UpdateTodoListHandler,
  CreateTodoItemHandler,
  UpdateTodoItemHandler,
  DeleteTodoItemHandler,
  ChangeTodoItemPriorityHandler,
];

const queryHandlers = [TodoListDetailHandler];
const eventHandlers = [
  TodoListDeletedEventHandler,
  TodoListCreatedEventHandler,
  TodoItemCreatedEventHandler,
  TodoItemDeletedEventHandler,
];
@Module({
  imports: [PersistenceModule, CqrsModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
})
export class TodoModule {}
