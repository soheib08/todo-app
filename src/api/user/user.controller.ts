import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { UserSignUpCommand } from '../../domain/user/command/sign-up.command';
import { JwtTokenDto, SignInDto } from './dto/sign-in.dto';
import { UserSignInCommand } from '../../domain/user/command/sign-in.command';
import { UserDetailQuery } from '../../domain/user/query/user-detail.query';
import { User } from '../../service/jwt/user.decorator';
import { DecodedUser } from '../../domain/user/interface/user.interface';
import { JwtAuthGuard } from '../../service/jwt/jwt.guard';
import { UserDetailDto } from './dto/user-detail.dto';

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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'signin user, get single access token' })
  @ApiResponse({ type: JwtTokenDto })
  async signInUser(@Body() body: SignInDto): Promise<JwtTokenDto> {
    return await this.commandBus.execute(
      new UserSignInCommand(body.username, body.password),
    );
  }

  @Get('detail')
  @ApiTags('TodoList')
  @ApiOperation({ summary: 'get user detail info with todoLists' })
  @ApiResponse({ type: UserDetailDto })
  @UseGuards(JwtAuthGuard)
  async userDetail(@User() user: DecodedUser): Promise<UserDetailDto> {
    return await this.queryBus.execute(new UserDetailQuery(user.userId));
  }
}
