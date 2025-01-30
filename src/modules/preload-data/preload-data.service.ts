import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { SubTypeProduct } from '../products/entities/sub_type_product.entity';
import { TypeProduct } from '../products/entities/type_product.entity';
import { Unit } from '../products/entities/unit.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import * as fs from 'fs';
import * as path from 'path';
const basePath = path.join(__dirname, '../../../data');

@Injectable()
export class PreloadDataService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(SubTypeProduct)
    private subTypeProductRepository: Repository<SubTypeProduct>,
    @InjectRepository(TypeProduct)
    private typeProductRepository: Repository<TypeProduct>,
    @InjectRepository(Unit) private unitRepository: Repository<Unit>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
  ) {}

  async preloadData() {
    // Cargar los datos de TypeProduct
    const typeProductsData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'type_products.json'), 'utf-8'),
    );
    for (const typeData of typeProductsData) {
      const typeProduct = this.typeProductRepository.create(typeData);
      await this.typeProductRepository.save(typeProduct);
    }

    // Cargar los datos de SubTypeProduct
    const subTypeProductsData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'sub_type_products.json'), 'utf-8'),
    );
    for (const subTypeData of subTypeProductsData) {
      const { typeProductId, acronyms, name, description } = subTypeData;
      const typeProduct = await this.typeProductRepository.findOne({
        where: { id: typeProductId },
      });
      const subTypeProduct = this.subTypeProductRepository.create();
      subTypeProduct.typeProduct = typeProduct;
      subTypeProduct.acronyms = acronyms;
      subTypeProduct.name = name;
      subTypeProduct.description = description;
      await this.subTypeProductRepository.save(subTypeProduct);
    }

    // Cargar los datos de Unit
    const unitsData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'units.json'), 'utf-8'),
    );
    for (const unitData of unitsData) {
      const unit = this.unitRepository.create(unitData);
      await this.unitRepository.save(unit);
    }

    // Cargar los datos de Product
    const productsData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'products.json'), 'utf-8'),
    );
    for (const productData of productsData) {
      const {
        typeProductId,
        subTypeProductId,
        name,
        description,
        unitId,
        cost,
        quantity,
      } = productData;
      const typeProduct = await this.typeProductRepository.findOne({
        where: { id: typeProductId },
      });
      const subTypeProduct = await this.subTypeProductRepository.findOne({
        where: { id: subTypeProductId },
      });
      const unit = await this.unitRepository.findOne({
        where: { id: unitId },
      });
      const product = this.productRepository.create();
      product.typeProduct = typeProduct;
      product.subTypeProduct = subTypeProduct;
      product.name = name;
      product.description = description;
      product.unit = unit;
      await this.productRepository.save(product);
      const inventory = this.inventoryRepository.create();
      inventory.product = product;
      inventory.quantity = quantity;
      inventory.cost = cost;
      await this.inventoryRepository.save(inventory);
    }

    console.log('Datos precargados correctamente');
  }
}
