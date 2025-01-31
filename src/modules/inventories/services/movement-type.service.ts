import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementType } from '../entities/movement_Type.entity';
import { Repository } from 'typeorm';
import { CreateMovementTypeDto } from '../dto/create-movement-type.dto';

@Injectable()
export class MovementTypeService {
  constructor(
    @InjectRepository(MovementType)
    private readonly movementTypeRepository: Repository<MovementType>,
  ) {}
  async create(createMovementTypeDto: CreateMovementTypeDto) {
    const { name, description } = createMovementTypeDto;
    const movementType = this.movementTypeRepository.create({
      name,
      description,
    });
    await this.movementTypeRepository.save(movementType);
    return movementType;
  }

  async findAll() {
    return await this.movementTypeRepository.find();
  }
}
