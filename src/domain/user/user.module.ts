import { Module } from '@nestjs/common';
import { UserSignupHandler } from './command/sign-up.command';
import { UserSignInHandler } from './command/sign-in.command';
import { PersistenceModule } from '../../persistence/persistence.module';
import { EncryptionModule } from '../../service/encryption/encryption.module';
import { UserDetailHandler } from './query/user-detail.query';

const commandHandlers = [UserSignupHandler, UserSignInHandler];
const queryHandlers = [UserDetailHandler];
@Module({
  imports: [PersistenceModule, EncryptionModule],
  controllers: [],
  providers: [...commandHandlers, ...queryHandlers],
})
export class UserModule {}
