import { ApiProperty } from '@nestjs/swagger';

export class TodoListItemDto {
  @ApiProperty({ example: 'object id' })
  id: string;
  @ApiProperty({ example: 'title' })
  title: string;

  @ApiProperty({ type: String, isArray: true, example: 'object id' })
  todoItems: Array<string>;
}

export class UserDetailDto {
  @ApiProperty({ example: 'object id' })
  id: string;
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ type: TodoListItemDto, isArray: true })
  todoLists: Array<TodoListItemDto>;
}
