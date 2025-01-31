import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovementTypeService } from '../services/movement-type.service';
import { CreateMovementTypeDto } from '../dto/create-movement-type.dto';

@Controller('movement-type')
export class MovementTypeController {
  constructor(private readonly movementTypeService: MovementTypeService) {}
  @Post()
  create(@Body() createMovementTypeDto: CreateMovementTypeDto) {
    return this.movementTypeService.create(createMovementTypeDto);
  }

  @Get()
  findAll() {
    return this.movementTypeService.findAll();
  }
}
