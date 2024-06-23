import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IUserRepository } from 'src/domain/user/interface/Iuser.repository';
import UserRepository from 'src/persistence/user/user.repository';
import { UserSchema } from './user/user.schema';
import { ConfigService } from '@nestjs/config';
import { ITodoListRepository } from 'src/domain/todo/interface/Itodo-list.repository';
import TodoListRepository from './todo/todo-list.repository';
import { TodoListSchema } from './todo/todo-list.schema';
import { TodoItemSchema } from './todo/todo-item.schema';
import { ITodoItemRepository } from 'src/domain/todo/interface/Itodo-item.repository';
import TodoItemRepository from './todo/todo-item.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
      imports: [],
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'TodoList',
        schema: TodoListSchema,
      },
      {
        name: 'TodoItem',
        schema: TodoItemSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: ITodoListRepository,
      useClass: TodoListRepository,
    },
    {
      provide: ITodoItemRepository,
      useClass: TodoItemRepository,
    },
  ],
  exports: [IUserRepository, ITodoListRepository, ITodoItemRepository],
})
export class PersistenceModule {}
