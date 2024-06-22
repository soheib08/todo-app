import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { UserSignUpCommand } from 'src/domain/user/command/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { JwtToken } from 'src/domain/user/entity/jwt-token';
import { UserSignInCommand } from 'src/domain/user/command/sign-in.command';

@ApiTags('User')
@ApiBearerAuth()
@Controller()
export default class UserController {
  constructor(private commandBus: CommandBus) {}
  @Post('signup')
  async signupUser(@Body() body: SignUpDto): Promise<HttpStatus> {
    await this.commandBus.execute(
      new UserSignUpCommand(body.username, body.password),
    );
    return HttpStatus.CREATED;
  }

  @Post('signin')
  async signInUser(@Body() body: SignInDto): Promise<JwtToken> {
    return await this.commandBus.execute(
      new UserSignInCommand(body.username, body.password),
    );
  }
}
