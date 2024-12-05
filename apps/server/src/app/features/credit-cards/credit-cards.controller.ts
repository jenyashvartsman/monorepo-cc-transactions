import { Controller, Get, Param } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardDto } from './dto/credit-card.dto';

@Controller('credit-cards')
export class CreditCardsController {
  constructor(private readonly creditCardsService: CreditCardsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CreditCardDto> {
    return await this.creditCardsService.findOne(id);
  }

  @Get('account/:accountId')
  async findAllByAccountId(
    @Param('accountId') accountId: string
  ): Promise<CreditCardDto[]> {
    return await this.creditCardsService.findAllByAccountId(accountId);
  }
}
