import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty({ example: 'todo1', description: 'todo list title' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
