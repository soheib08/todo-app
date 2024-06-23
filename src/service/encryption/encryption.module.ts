import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { IPasswordService } from '../../domain/user/interface/password-service.interface';

@Global()
@Module({
  imports: [],
  providers: [{ provide: IPasswordService, useClass: PasswordService }],
  exports: [IPasswordService],
})
export class EncryptionModule {}
