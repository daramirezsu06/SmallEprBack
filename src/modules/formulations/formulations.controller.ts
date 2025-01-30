import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FormulationsService } from './formulations.service';
import { CreateFormulationDto } from './dto/create-formulation.dto';

@Controller('formulations')
export class FormulationsController {
  constructor(private readonly formulationsService: FormulationsService) {}

  @Post()
  create(@Body() createFormulationDto: CreateFormulationDto) {
    return this.formulationsService.create(createFormulationDto);
  }
  @Get()
  findAll() {
    return this.formulationsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.formulationsService.findOne(id);
  }
}
