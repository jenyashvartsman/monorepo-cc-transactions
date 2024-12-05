import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/server/src/database';
import { CreditCardDto } from './dto/credit-card.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CreditCardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string): Promise<CreditCardDto> {
    const creditCard = await this.databaseService.creditCard.findFirst({
      where: { id },
    });

    if (creditCard) {
      return plainToClass(CreditCardDto, creditCard);
    } else {
      throw new NotFoundException(`Could not find credit card with id: ${id}`);
    }
  }

  async findAllByAccountId(accountId: string): Promise<CreditCardDto[]> {
    const account = await this.databaseService.account.findFirst({
      where: { id: accountId },
      include: { creditCards: true },
    });

    if (account) {
      return (
        account.creditCards.map((creditCard) =>
          plainToClass(CreditCardDto, creditCard)
        ) || []
      );
    } else {
      throw new NotFoundException(
        `Could not find account with id: ${accountId}`
      );
    }
  }
}
