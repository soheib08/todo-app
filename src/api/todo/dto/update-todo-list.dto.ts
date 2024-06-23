import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoListDto {
  @ApiProperty({ example: 'object id', description: 'todo id' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiProperty({ example: 'todo1', description: 'todo list title' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
