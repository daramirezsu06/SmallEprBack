import { Controller, Post, Body, Get } from '@nestjs/common';
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
  @Get(':id')
  findOnePurchase(@Body() id: number) {
    return this.purchasesService.findOnePurchase(id);
  }

  @Post('suppliers')
  createSupplier(@Body() supplier: CreateSupplierDto) {
    return this.purchasesService.createSupplier(supplier);
  }

  @Get('suppliers')
  findAllSuppliers() {
    return this.purchasesService.findAllSuppliers();
  }
}
