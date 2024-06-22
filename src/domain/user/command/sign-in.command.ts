import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IPasswordService } from '../interface/password-service.interface';
import { JwtToken } from '../entity/jwt-token';
import { IUserRepository } from '../interface/Iuser.repository';
import { IJwtService } from '../interface/jwt.service.interface';

export class UserSignInCommand {
  constructor(
    public username: string,
    public password: string,
  ) {}
}
@CommandHandler(UserSignInCommand)
export class UserSignInHandler implements ICommandHandler<UserSignInCommand> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IPasswordService)
    private passwordService: IPasswordService,
    @Inject(IJwtService)
    private jwtService: IJwtService,
  ) {}
  async execute(command: UserSignInCommand): Promise<JwtToken> {
    const foundUser = await this.userRepository.findOneByUsername(
      command.username,
    );
    if (!foundUser) throw new NotFoundException('username not found');

    const isPasswordValid = await this.passwordService.compare(
      command.password,
      foundUser.password,
    );
    if (!isPasswordValid) throw new NotFoundException('wrong password');

    const token = await this.jwtService.generateToken(foundUser.username);
    return new JwtToken(token);
  }
}
