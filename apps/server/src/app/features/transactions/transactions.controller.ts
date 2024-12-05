import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('credit-card/:creditCardId')
  async findAllByCreditCardId(
    @Param('creditCardId') creditCardId: string
  ): Promise<TransactionDto[]> {
    return await this.transactionsService.findAllByCreditCardId(creditCardId);
  }

  @Get('business/:businessId')
  async findAllByBusinessId(
    @Param('businessId') businessId: string
  ): Promise<TransactionDto[]> {
    return await this.transactionsService.findAllByBusinessId(businessId);
  }
}
