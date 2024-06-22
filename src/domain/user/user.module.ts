import { Module } from '@nestjs/common';
import { UserSignupHandler } from './command/sign-up.command';
import { UserSignInHandler } from './command/sign-in.command';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionModule } from 'src/service/encryption/encryption.module';

const commandHandlers = [UserSignupHandler, UserSignInHandler];
@Module({
  imports: [PersistenceModule, EncryptionModule, JwtModule.register({})],
  controllers: [],
  providers: [UserService, ...commandHandlers],
})
export class UserModule {}
