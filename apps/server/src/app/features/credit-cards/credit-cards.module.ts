import { Module } from '@nestjs/common';
import { CreditCardsService } from './credit-cards.service';
import { CreditCardsController } from './credit-cards.controller';
import { DatabaseModule } from 'apps/server/src/database';

@Module({
  imports: [DatabaseModule],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
})
export class CreditCardsModule {}
