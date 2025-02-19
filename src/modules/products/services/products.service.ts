import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Unit } from '../entities/unit.entity';
import { TypeProduct } from '../entities/type_product.entity';
import { InventoriesService } from 'src/modules/inventories/services/inventories.service';
import { SubTypeProduct } from '../entities/sub_type_product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Unit) private readonly unitRepository: Repository<Unit>,
    @InjectRepository(TypeProduct)
    private readonly typeProductRepository: Repository<TypeProduct>,
    @InjectRepository(SubTypeProduct)
    private readonly subTypeProductRepository: Repository<SubTypeProduct>,
    private readonly InventoriesService: InventoriesService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { name, description, unitId, typeProductId } = createProductDto;
    const unit = await this.unitRepository.findOneBy({ id: unitId });
    const typeProduct = await this.typeProductRepository.findOneBy({
      id: typeProductId,
    });
    const subTypeProduct = await this.subTypeProductRepository.findOneBy({
      id: typeProductId,
    });

    const product = this.productRepository.create({
      name,
      description,
      unit,
      typeProduct,
      subTypeProduct,
    });
    await this.productRepository.save(product);
    await this.InventoriesService.create({
      cost: 0,
      quantity: 0,
      productId: product.id,
    });
    return product;
  }

  async findAll(typeId: number) {
    if (typeId) {
      return await this.productRepository.find({
        where: { typeProduct: { id: typeId } },
        relations: ['typeProduct', 'unit', 'subTypeProduct'],
      });
    }
    return await this.productRepository.find({
      relations: ['typeProduct', 'unit', 'subTypeProduct'],
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: { id }, // Usamos "where" para las condiciones de búsqueda
      relations: ['inventory'], // Aquí especificas las relaciones que deseas cargar
    });
  }
}
