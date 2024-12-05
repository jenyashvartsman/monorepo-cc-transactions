import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TransactionDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  businessId: string;

  @Expose()
  creditCardId: string;
}
