import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { ConfigModule } from '@nestjs/config';
import UserController from './api/user/user.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule, UserModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
