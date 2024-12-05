import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './../app/app.module';
import request from 'supertest';
import { AccountDto } from '../app/features/accounts/dto/account.dto';

const accounts: AccountDto[] = [
  {
    id: 'uuid',
    name: 'John Smith',
    email: 'john_smith@email.com',
  },
];

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        account: {
          findMany: jest.fn().mockImplementation(() => {
            return accounts;
          }),
        },
      };
    }),
  };
});

describe('App', () => {
  let app: INestApplication;
  let server: any;

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
    server = app.getHttpServer();
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return 200', async () => {
      const response = await request(server).get('/api/accounts');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(accounts);
    });
  });
});
