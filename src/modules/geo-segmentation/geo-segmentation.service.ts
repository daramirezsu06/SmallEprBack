import { Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { CreateNeighborhoodDto } from './dto/update-neighborhood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Repository } from 'typeorm';
import { Neighborhood } from './entities/neighborhood.entity';

@Injectable()
export class GeoSegmentationService {
  constructor(
    @InjectRepository(Municipality)
    private municipalityRepository: Repository<Municipality>,
    @InjectRepository(Neighborhood)
    private neighborhoodRepository: Repository<Neighborhood>,
  ) {}
  async createMunicipality(createGeoSegmentationDto: CreateMunicipalityDto) {
    const newMunicipality = this.municipalityRepository.create();
    newMunicipality.name = createGeoSegmentationDto.name;
    return await this.municipalityRepository.save(newMunicipality);
  }
  async createNeighborhood(createGeoSegmentationDto: CreateNeighborhoodDto) {
    const municipality = await this.municipalityRepository.findOne({
      where: { id: createGeoSegmentationDto.municipalityId },
    });
    const newNeighborhood = this.neighborhoodRepository.create();
    newNeighborhood.name = createGeoSegmentationDto.name;
    newNeighborhood.municipality = municipality;

    return await this.neighborhoodRepository.save(newNeighborhood);
  }

  async findAllMunicipality() {
    return await this.municipalityRepository.find({
      relations: ['neighborhoods'],
    });
  }
  async findAllNeighborhood() {
    return await this.neighborhoodRepository.find({
      relations: ['municipality'],
    });
  }
}
