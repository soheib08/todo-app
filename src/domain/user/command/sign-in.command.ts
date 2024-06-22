import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../user.service';
import { IPasswordService } from '../interface/password-service.interface';
import { JwtToken } from '../entity/jwt-token';

export class UserSignInCommand {
  constructor(
    public username: string,
    public password: string,
  ) {}
}
@CommandHandler(UserSignInCommand)
export class UserSignInHandler implements ICommandHandler<UserSignInCommand> {
  constructor(
    private userService: UserService,
    @Inject(IPasswordService)
    private passwordService: IPasswordService,
  ) {}
  async execute(command: UserSignInCommand): Promise<JwtToken> {
    const foundUser = await this.userService.findUserByUsername(
      command.username,
    );
    if (!foundUser) throw new NotFoundException('username not found');

    const isPasswordValid = await this.passwordService.compare(
      command.password,
      foundUser.password,
    );
    if (!isPasswordValid) throw new NotFoundException('wrong password');

    const token = await this.userService.createSignInToken(foundUser.username);
    return new JwtToken(token);
  }
}
