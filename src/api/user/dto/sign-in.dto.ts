import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'username', description: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password', description: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class JwtTokenDto {
  @ApiProperty({ example: 'jwt token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
