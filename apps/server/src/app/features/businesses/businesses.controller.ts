import { Controller, Get, Param } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessDto } from './dto/business.dto';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get()
  async findAll(): Promise<BusinessDto[]> {
    return await this.businessesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BusinessDto> {
    return await this.businessesService.findOne(id);
  }
}
