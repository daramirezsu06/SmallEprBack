import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../entities/inventory.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createInventoryDto: CreateInventoryDto) {
    const { cost, quantity, productId } = createInventoryDto;
    const product = await this.productRepository.findOneBy({ id: productId });
    const inventory = this.inventoryRepository.create({
      cost,
      quantity,
      product,
    });
    return await this.inventoryRepository.save(inventory);
  }
  async findAll() {
    return await this.inventoryRepository.find({ relations: ['product'] });
  }
}
