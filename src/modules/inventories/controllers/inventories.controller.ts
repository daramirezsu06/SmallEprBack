import { Controller, Post, Body, Get } from '@nestjs/common';
import { InventoriesService } from '../services/inventories.service';
import { CreateInventoryDto } from '../dto/create-inventory.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }
  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }
}
