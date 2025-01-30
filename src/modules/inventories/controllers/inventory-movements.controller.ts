import { Body, Controller, Post } from '@nestjs/common';
import { InventoryMovementsService } from '../services/inventory-movements.service';
import { CreateInventoryMovementsDto } from '../dto/create-inventory-movement.dto';

@Controller('inventory-movements')
export class InventoryMovementsController {
  constructor(
    private readonly inventoryMovementsService: InventoryMovementsService,
  ) {}
  // @Post()
  // create(@Body() createInventoryMovementsDto: CreateInventoryMovementsDto) {
  //   return this.inventoryMovementsService.Create(createInventoryMovementsDto);
  // }
}
