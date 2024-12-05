import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { DatabaseService } from 'apps/server/src/database';
import { AccountDto } from './dto/account.dto';

describe('AccountsService', () => {
  let service: AccountsService;

  const accountsTestData: AccountDto[] = [
    {
      id: 'uuid',
      name: 'John Smith',
      email: 'john_smith@email.com',
    },
  ];

  const findManyMock = jest.fn().mockImplementation(() => accountsTestData);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: DatabaseService,
          useValue: { account: { findMany: findManyMock } },
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all accounts', async () => {
    const accountDtos = await service.findAll();
    expect(accountDtos).toEqual(accountsTestData);
  });
});
