import { Module, ValidationPipe } from '@nestjs/common';

import { AccountsModule } from './features/accounts';
import { APP_PIPE } from '@nestjs/core';
import { CreditCardsModule } from './features/credit-cards/credit-cards.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { BusinessesModule } from './features/businesses/businesses.module';

@Module({
  imports: [
    AccountsModule,
    CreditCardsModule,
    TransactionsModule,
    BusinessesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
