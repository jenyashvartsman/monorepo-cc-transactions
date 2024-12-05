import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/server/src/database';
import { AccountDto } from './dto/account.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.databaseService.account.findMany();
    return accounts?.map((account) => plainToClass(AccountDto, account)) || [];
  }

  async findOne(id: string): Promise<AccountDto> {
    const account = await this.databaseService.account.findFirst({
      where: { id },
    });

    if (account) {
      return plainToClass(AccountDto, account);
    } else {
      throw new NotFoundException(`Could not find account with id: ${id}`);
    }
  }
}
