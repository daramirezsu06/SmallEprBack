import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }
}
