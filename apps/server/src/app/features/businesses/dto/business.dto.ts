import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BusinessDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  owner: string;

  @Expose()
  phone: string;
}
