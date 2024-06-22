import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtService } from './jwt.service';
import { IJwtService } from 'src/domain/user/interface/jwt.service.interface';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [{ provide: IJwtService, useClass: UserJwtService }],
  exports: [IJwtService],
})
export class UserJwtModule {}
