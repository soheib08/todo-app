import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { ConfigModule } from '@nestjs/config';
import UserController from './api/user/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoModule } from './domain/todo/todo.module';
import TodoListController from './api/todo/todo-list.controller';
import { UserJwtModule } from './service/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserJwtModule,
    CqrsModule,
    UserModule,
    TodoModule,
  ],
  controllers: [UserController, TodoListController],
  providers: [],
})
export class AppModule {}
