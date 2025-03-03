import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SellsService } from './sells.service';
import { CreateSellDto } from './dto/create-sell.dto';

@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @Post()
  create(@Body() createSellDto: CreateSellDto) {
    console.log(createSellDto);

    return this.sellsService.create(createSellDto);
  }

  @Get()
  findAll() {
    return this.sellsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findOne(+id);
  }
}
