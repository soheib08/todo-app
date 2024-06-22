import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
