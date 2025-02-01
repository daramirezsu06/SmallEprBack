import { Body, Controller, Post } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateTypeSellerDto } from './dtos/createTypeSellerDto';
import { CreateSellerDto } from './dtos/createSellerDto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.createSeller(createSellerDto);
  }

  @Post('typeSeller')
  createTypeSeller(@Body() createTypeSellerDto: CreateTypeSellerDto) {
    return this.sellerService.createTypeSeller(createTypeSellerDto);
  }
}
