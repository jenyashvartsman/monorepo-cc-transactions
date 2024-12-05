import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreditCardDto {
  @Expose()
  id: string;

  @Expose()
  number: string;

  @Expose()
  accountId: string;
}
