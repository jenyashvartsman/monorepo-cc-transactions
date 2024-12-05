import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'apps/server/src/database';
import { BusinessDto } from './dto/business.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BusinessesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<BusinessDto[]> {
    const businesses = await this.databaseService.business.findMany();
    return (
      businesses?.map((business) => plainToClass(BusinessDto, business)) || []
    );
  }

  async findOne(id: string): Promise<BusinessDto> {
    const business = await this.databaseService.business.findFirst({
      where: { id },
    });

    if (business) {
      return plainToClass(BusinessDto, business);
    } else {
      throw new NotFoundException(`Could not find business with id: ${id}`);
    }
  }
}
