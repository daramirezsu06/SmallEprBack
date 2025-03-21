import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { CreateSupplierDto } from './dto/create-suppler.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }
  @Get()
  findAllPurchases() {
    return this.purchasesService.findAllPurchases();
  }

  @Post('suppliers')
  createSupplier(@Body() supplier: CreateSupplierDto) {
    return this.purchasesService.createSupplier(supplier);
  }

  @Get('suppliers')
  findAllSuppliers() {
    return this.purchasesService.findAllSuppliers();
  }
  @Get(':id')
  findOnePurchase(@Param('id') id: string) {
    return this.purchasesService.findOnePurchase(+id);
  }
}
