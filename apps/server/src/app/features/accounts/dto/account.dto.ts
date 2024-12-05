import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccountDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
