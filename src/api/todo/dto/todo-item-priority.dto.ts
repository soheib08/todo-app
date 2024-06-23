import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { TodoItemPriority } from 'src/domain/todo/constant/order-item-priority';

export class TodoItemPriorityDto {
  @ApiProperty({ example: 'object id', description: 'todo item id' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({
    example: TodoItemPriority.HIGH,
    description: 'todo item priority',
    enum: TodoItemPriority,
  })
  @IsNotEmpty()
  @IsEnum(TodoItemPriority)
  priority: TodoItemPriority;
}
