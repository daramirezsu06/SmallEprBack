import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TypeOfProductService } from '../services/type-of-product.service';
import { CreateTypeOfProductDto } from '../dto/create-type-of-product.dto';

@Controller('type-of-product')
export class TypeOfProductController {
  constructor(private readonly typeOfProductService: TypeOfProductService) {}
  @Get()
  findAll() {
    return this.typeOfProductService.findAll();
  }

  @Post()
  create(@Body() createTypeOfProductDto: CreateTypeOfProductDto) {
    return this.typeOfProductService.create(createTypeOfProductDto);
  }
  @Get('sub-type-of-product')
  findsubTypesOfProduct() {
    return this.typeOfProductService.findsubTypesOfProduct();
  }

  @Get('sub-type-of-product/:id')
  findsubTypeOfProductByTypeOfProductId(@Param('id') id: string) {
    return this.typeOfProductService.findsubTypeOfProductByTypeOfProductId(+id);
  }
}
