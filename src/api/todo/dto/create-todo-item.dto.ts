import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoItemPriority } from '../../../domain/todo/constant/order-item-priority';

export class CreateTodoItemDto {
  @ApiProperty({ example: 'object id', description: 'todo list id' })
  @IsNotEmpty()
  @IsString()
  todoList: string;

  @ApiProperty({ example: 'todo item title', description: 'todo list title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'todo1', description: 'todo list title' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: TodoItemPriority.HIGH,
    description: 'todo item priority',
    enum: TodoItemPriority,
  })
  @IsNotEmpty()
  @IsEnum(TodoItemPriority)
  priority: TodoItemPriority;
}
