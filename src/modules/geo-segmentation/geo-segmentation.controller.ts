import { Controller, Get, Post, Body } from '@nestjs/common';
import { GeoSegmentationService } from './geo-segmentation.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { CreateNeighborhoodDto } from './dto/update-neighborhood.dto';

@Controller('geo-segmentation')
export class GeoSegmentationController {
  constructor(
    private readonly geoSegmentationService: GeoSegmentationService,
  ) {}

  @Post('municipality')
  createMunicipality(@Body() createMunicipality: CreateMunicipalityDto) {
    return this.geoSegmentationService.createMunicipality(createMunicipality);
  }
  @Post('neighborhood')
  createNeighborhood(@Body() createNeighborhood: CreateNeighborhoodDto) {
    return this.geoSegmentationService.createNeighborhood(createNeighborhood);
  }

  @Get('municipality')
  findAllMunicipality() {
    return this.geoSegmentationService.findAllMunicipality();
  }
  @Get('neighborhood')
  findAllNeighborhood() {
    return this.geoSegmentationService.findAllNeighborhood();
  }
}
