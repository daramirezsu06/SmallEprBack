import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';

@Controller('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) {}

  @Post()
  create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionsService.create(createProductionDto);
  }
  @Get()
  findAll() {
    return this.productionsService.findAll();
  }
}
