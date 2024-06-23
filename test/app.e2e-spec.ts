import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IUserRepository } from '../src/domain/user/interface/Iuser.repository';
import { IPasswordService } from '../src/domain/user/interface/password-service.interface';
import { IJwtService } from '../src/domain/user/interface/jwt.service.interface';
import { JwtToken } from '../src/domain/user/entity/jwt-token';

// Mock for IUserRepository
const mockUserRepository = {
  findOneByUsername: jest.fn(),
  createOne: jest.fn(),
  findUserWithTodoLists: jest.fn(),
};

// Mock for IPasswordService
const mockPasswordService = {
  hash: jest.fn(),
  compare: jest.fn(),
};

// Mock for IJwtService
const mockJwtService = {
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
};

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: IUserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: IPasswordService,
          useValue: mockPasswordService,
        },
        {
          provide: IJwtService,
          useValue: mockJwtService,
        },
        CommandBus,
        QueryBus,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    commandBus = moduleFixture.get<CommandBus>(CommandBus);
    queryBus = moduleFixture.get<QueryBus>(QueryBus);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user/signup (POST) should sign up a user', async () => {
    const signUpDto = { username: 'testuser', password: 'testpassword' };
    jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

    await request(app.getHttpServer())
      .post('/user/signup')
      .send(signUpDto)
      .expect(201);
  });

  it('/user/signin (POST) should sign in a user and return JWT token', async () => {
    const signInDto = { username: 'testuser', password: 'testpassword' };
    const mockToken = new JwtToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc2MWExYTVlNjFiOGUzZTkxNGQyNzMiLCJpYXQiOjE3MTkxNTkxNzF9.JysOs6HQKMK53e9v44fvS8YSqosMnrWMKjo4sKa7ZNI',
    );
    jest.spyOn(commandBus, 'execute').mockResolvedValue(mockToken);

    const response = await request(app.getHttpServer())
      .post('/user/signin')
      .send(signInDto)
      .expect(200);

    expect(response.body).toEqual({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc2MWExYTVlNjFiOGUzZTkxNGQyNzMiLCJpYXQiOjE3MTkxNTkxNzF9.JysOs6HQKMK53e9v44fvS8YSqosMnrWMKjo4sKa7ZNI',
    });
  });

  it('/user/detail (GET) should return user details with todo lists', async () => {
    const mockUserDetail = {
      id: '1',
      username: 'testuser',
      todoLists: [
        {
          id: '1',
          title: 'Test Todo List',
          todoItems: [],
        },
      ],
    };
    jest.spyOn(queryBus, 'execute').mockResolvedValue(mockUserDetail);

    const response = await request(app.getHttpServer())
      .get('/user/detail')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njc2MWExYTVlNjFiOGUzZTkxNGQyNzMiLCJpYXQiOjE3MTkxNTkxNzF9.JysOs6HQKMK53e9v44fvS8YSqosMnrWMKjo4sKa7ZNI',
      )
      .expect(200);

    expect(response.body).toEqual(mockUserDetail);
  });
});
