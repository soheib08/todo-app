import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { UserSignUpCommand } from 'src/domain/user/command/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { JwtToken } from 'src/domain/user/entity/jwt-token';
import { UserSignInCommand } from 'src/domain/user/command/sign-in.command';
import { UserDetailQuery } from 'src/domain/user/query/user-detail.query';
import { User } from 'src/service/jwt/user.decorator';
import { DecodedUser } from 'src/domain/user/interface/user.interface';
import { JwtAuthGuard } from 'src/service/jwt/jwt.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export default class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
  @Post('signup')
  @ApiOperation({ summary: 'signup user' })
  async signupUser(@Body() body: SignUpDto): Promise<HttpStatus> {
    await this.commandBus.execute(
      new UserSignUpCommand(body.username, body.password),
    );
    return HttpStatus.CREATED;
  }

  @Post('signin')
  @ApiOperation({ summary: 'signin user, get single access token' })
  async signInUser(@Body() body: SignInDto): Promise<JwtToken> {
    return await this.commandBus.execute(
      new UserSignInCommand(body.username, body.password),
    );
  }

  @Get('detail')
  @ApiTags('TodoList')
  @ApiOperation({ summary: 'get user detail info with todoLists' })
  @UseGuards(JwtAuthGuard)
  async userDetail(@User() user: DecodedUser): Promise<JwtToken> {
    return await this.queryBus.execute(new UserDetailQuery(user.userId));
  }
}
