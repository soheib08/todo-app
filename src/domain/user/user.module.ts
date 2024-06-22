import { Module } from '@nestjs/common';
import { UserSignupHandler } from './command/sign-up.command';
import { UserSignInHandler } from './command/sign-in.command';
import { PersistenceModule } from 'src/persistence/persistence.module';
import { EncryptionModule } from 'src/service/encryption/encryption.module';
import { UserJwtModule } from 'src/service/jwt/jwt.module';

const commandHandlers = [UserSignupHandler, UserSignInHandler];
@Module({
  imports: [PersistenceModule, EncryptionModule, UserJwtModule],
  controllers: [],
  providers: [...commandHandlers],
})
export class UserModule {}
