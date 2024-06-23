import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { CreateTodoListHandler } from './command/create-todo-list.command';
import { DeleteTodoListHandler } from './command/delete-todo-list.command';
import { UpdateTodoListHandler } from './command/update-todo-list.command';
import { ChangeTodoItemPriorityHandler } from './command/change-todo-item-priority.command';
import { CreateTodoItemHandler } from './command/create-todo-item.command';
import { UpdateTodoItemHandler } from './command/update-todo-item.command';
import { DeleteTodoItemHandler } from './command/delete-todo-item.command';

const commandHandlers = [
  CreateTodoListHandler,
  DeleteTodoListHandler,
  UpdateTodoListHandler,
  CreateTodoItemHandler,
  UpdateTodoItemHandler,
  DeleteTodoItemHandler,
  ChangeTodoItemPriorityHandler,
];
@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [...commandHandlers],
})
export class TodoModule {}
