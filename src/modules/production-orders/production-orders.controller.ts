import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';

@Controller('production-orders')
export class ProductionOrdersController {
  constructor(
    private readonly productionOrdersService: ProductionOrdersService,
  ) {}

  @Post()
  create(@Body() createProductionOrderDto: CreateProductionOrderDto) {
    return this.productionOrdersService.create(createProductionOrderDto);
  }

  @Get()
  findAll() {
    return this.productionOrdersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionOrdersService.findOne(+id);
  }
}
