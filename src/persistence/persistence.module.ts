import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IUserRepository } from 'src/domain/user/interface/Iuser.repository';
import UserRepository from 'src/persistence/user/user.repository';
import { UserSchema } from './user/user.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
      imports: [],
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})
export class PersistenceModule {}
