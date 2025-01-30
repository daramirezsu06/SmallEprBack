import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeProduct } from '../entities/type_product.entity';
import { Repository } from 'typeorm';
import { CreateTypeOfProductDto } from '../dto/create-type-of-product.dto';
import { SubTypeProduct } from '../entities/sub_type_product.entity';

@Injectable()
export class TypeOfProductService {
  constructor(
    @InjectRepository(TypeProduct)
    private readonly typeOfProductRepository: Repository<TypeProduct>,
    @InjectRepository(SubTypeProduct)
    private readonly subTypeProductRepository: Repository<SubTypeProduct>,
  ) {}
  async findAll() {
    return await this.typeOfProductRepository.find({
      relations: ['subTypeProduct'],
    });
  }

  async create(createTypeOfProductDto: CreateTypeOfProductDto) {
    const { name, description } = createTypeOfProductDto;
    const typeOfProduct = this.typeOfProductRepository.create({
      name,
      description,
    });
    return await this.typeOfProductRepository.save(typeOfProduct);
  }

  async findsubTypesOfProduct() {
    return await this.subTypeProductRepository.find({
      relations: ['typeProduct'],
    });
  }
  async findsubTypeOfProductByTypeOfProductId(id: number) {
    const typeOfProduct = await this.typeOfProductRepository.findOne({
      where: { id },
      relations: ['subTypeProduct'],
    });
    return typeOfProduct.subTypeProduct;
  }
}
