import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @ApiProperty({ example: 'object id', description: 'todo item id' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({ example: 'todo1', description: 'todo item title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'todo1', description: 'todo item title' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
