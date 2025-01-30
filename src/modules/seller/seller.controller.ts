import { Body, Controller, Post } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateTypeSellerDto } from './dtos/createTypeSellerDto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('typeSeller')
  createTypeSeller(@Body() createTypeSellerDto: CreateTypeSellerDto) {
    return this.sellerService.createTypeSeller(createTypeSellerDto);
  }
}
