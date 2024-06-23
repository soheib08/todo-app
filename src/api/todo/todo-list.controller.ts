import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DecodedUser } from 'src/domain/user/interface/user.interface';
import { User } from '../../service/jwt/user.decorator';
import { JwtAuthGuard } from 'src/service/jwt/jwt.guard';
import { CreateTodoListCommand } from 'src/domain/todo/command/create-todo-list.command';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { UpdateTodoListCommand } from 'src/domain/todo/command/update-todo-list.command';
import { DeleteTodoListCommand } from 'src/domain/todo/command/delete-todo-list.command';
import { TodoListDetailQuery } from 'src/domain/todo/query/todo-list-detail.query';
import { DeleteTodoItemCommand } from 'src/domain/todo/command/delete-todo-item.command';
import { UpdateTodoItemCommand } from 'src/domain/todo/command/update-todo-item.command';
import { CreateTodoItemCommand } from 'src/domain/todo/command/create-todo-item.command';
import { ChangeTodoItemPriorityCommand } from 'src/domain/todo/command/change-todo-item-priority.command';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItemPriorityDto } from './dto/todo-item-priority.dto';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';

@Controller('todo-list')
@ApiTags('TodoList')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export default class TodoListController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
  @Post()
  @ApiOperation({ summary: 'create todo list' })
  async createTodoList(
    @Body() body: CreateTodoListDto,
    @User() user: DecodedUser,
  ): Promise<void> {
    this.commandBus.execute(new CreateTodoListCommand(user.userId, body.title));
  }

  @Get(':id')
  @ApiOperation({ summary: 'get todo list detail with todoItems' })
  @UseGuards(JwtAuthGuard)
  async userDetail(@Param('id') id: string): Promise<void> {
    return await this.queryBus.execute(new TodoListDetailQuery(id));
  }

  @Patch()
  @ApiOperation({ summary: 'update todo list' })
  async updateTodoList(@Body() body: UpdateTodoListDto): Promise<void> {
    this.commandBus.execute(new UpdateTodoListCommand(body.id, body.title));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete todo list' })
  async deleteTodoList(@Param('id') id: string): Promise<void> {
    this.commandBus.execute(new DeleteTodoListCommand(id));
  }

  @Post('todo-item')
  @ApiOperation({ summary: 'create todo item' })
  async createTodoItem(
    @Body() body: CreateTodoItemDto,
    @User() user: DecodedUser,
  ): Promise<void> {
    this.commandBus.execute(
      new CreateTodoItemCommand(
        user.userId,
        body.title,
        body.description,
        body.priority,
      ),
    );
  }

  @Patch('todo-item')
  @ApiOperation({ summary: 'update todo item' })
  async updateTodoItem(@Body() body: UpdateTodoItemDto): Promise<void> {
    this.commandBus.execute(
      new UpdateTodoItemCommand(body.id, body.title, body.description),
    );
  }

  @Patch('todo-item/priority')
  @ApiOperation({ summary: 'update Item priority' })
  async updateTodoItemPriority(
    @Body() body: TodoItemPriorityDto,
  ): Promise<void> {
    this.commandBus.execute(
      new ChangeTodoItemPriorityCommand(body.id, body.priority),
    );
  }

  @Delete('todo-item/:id')
  @ApiOperation({ summary: 'delete todo item' })
  async deleteTodoItem(@Param('id') id: string): Promise<void> {
    this.commandBus.execute(new DeleteTodoItemCommand(id));
  }
}