import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(): Promise<AccountDto[]> {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AccountDto> {
    return await this.accountsService.findOne(id);
  }
}
