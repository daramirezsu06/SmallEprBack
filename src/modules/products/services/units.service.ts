import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from '../entities/unit.entity';
import { Repository } from 'typeorm';
import { CreateUnitDto } from '../dto/create-unit-dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
  ) {}

  async findAll() {
    return await this.unitRepository.find();
  }

  async create(createUnitDto: CreateUnitDto) {
    const { name, description } = createUnitDto;
    const unit = this.unitRepository.create({
      name,
      description,
    });
    return await this.unitRepository.save(unit);
  }
}
