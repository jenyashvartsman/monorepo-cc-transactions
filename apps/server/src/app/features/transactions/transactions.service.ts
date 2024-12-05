import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/server/src/database';
import { TransactionDto } from './dto/transaction.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllByCreditCardId(creditCardId: string): Promise<TransactionDto[]> {
    const creditCard = await this.databaseService.creditCard.findFirst({
      where: { id: creditCardId },
      include: { transactions: true },
    });

    if (creditCard) {
      return (
        creditCard.transactions?.map((transaction) =>
          plainToClass(TransactionDto, transaction)
        ) || []
      );
    } else {
      throw new NotFoundException(
        `Could not find credit card with id: ${creditCardId}`
      );
    }
  }

  async findAllByBusinessId(businessId: string): Promise<TransactionDto[]> {
    const business = await this.databaseService.business.findFirst({
      where: { id: businessId },
      include: { transactions: true },
    });

    if (business) {
      return (
        business.transactions?.map((transaction) =>
          plainToClass(TransactionDto, transaction)
        ) || []
      );
    } else {
      throw new NotFoundException(
        `Could not find business with id: ${businessId}`
      );
    }
  }
}
