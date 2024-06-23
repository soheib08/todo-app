import { ApiProperty } from '@nestjs/swagger';
import { TodoItemPriority } from '../../../domain/todo/constant/order-item-priority';

export class TodoItemDto {
  @ApiProperty({ example: 'object id' })
  id: string;

  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ example: 'description' })
  description: string;

  @ApiProperty({ enum: TodoItemPriority, example: TodoItemPriority.HIGH })
  priority: TodoItemPriority;
}

export class TodoListDto {
  @ApiProperty({ example: 'object id' })
  id: string;
  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ type: TodoItemDto, isArray: true })
  todoItems: Array<TodoItemDto>;
}
