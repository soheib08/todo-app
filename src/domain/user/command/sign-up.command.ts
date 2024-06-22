import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../interface/Iuser.repository';
import { IPasswordService } from '../interface/password-service.interface';
import { User } from '../entity/user';

export class UserSignUpCommand {
  constructor(
    public username: string,
    public password: string,
  ) {}
}
@CommandHandler(UserSignUpCommand)
export class UserSignupHandler implements ICommandHandler<UserSignUpCommand> {
  constructor(
    @Inject(IUserRepository) private userRepository: IUserRepository,
    @Inject(IPasswordService)
    private passwordService: IPasswordService,
  ) {}
  async execute(command: UserSignUpCommand): Promise<void> {
    const foundUsername = await this.userRepository.findOneByUsername(
      command.username,
    );
    if (foundUsername) throw new NotFoundException('username is already taken');

    const hashedPassword = await this.passwordService.hash(command.password);
    await this.userRepository.createOne(
      new User(command.username, hashedPassword),
    );
  }
}
