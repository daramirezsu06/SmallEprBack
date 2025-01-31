import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { Production } from './entities/production.entity';

import { ProductsService } from '../products/services/products.service';
import { ProductionOrdersService } from '../production-orders/production-orders.service';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { ProductionOrder } from '../production-orders/entities/production-order.entity';
import { ProductionItems } from './entities/Production_items.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';

@Injectable()
export class ProductionsService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(ProductionItems)
    private readonly productionItemsRepository: Repository<ProductionItems>,
    @InjectRepository(InventoryMovements)
    private readonly inventoryMovementsRepository: Repository<InventoryMovements>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(MovementType)
    private readonly inventoryMovementsTypeRepository: Repository<MovementType>,
    private readonly productsService: ProductsService,
    private readonly productionOrdersService: ProductionOrdersService,
  ) {}

  async create(createProductionDto: CreateProductionDto) {
    const { quantity, productionOrderId, productionItems } =
      createProductionDto;
    const productionOrder =
      await this.productionOrdersService.findOne(productionOrderId);
    const product = productionOrder.product;

    const queryRunner =
      this.productionRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Crear la producción
      const production = this.createProductionEntity(
        +quantity,
        productionOrder,
        product,
      );
      const savedProduction = await queryRunner.manager.save(
        Production,
        production,
      );

      // Procesar items de producción e inventarios
      const { itemsToSave, inventoryMovementsToSave, totalCost } =
        await this.processProductionItems(
          productionItems,
          savedProduction,
          queryRunner,
        );

      // Guardar items y movimientos de inventario
      await queryRunner.manager.save(ProductionItems, itemsToSave);
      await queryRunner.manager.save(
        InventoryMovements,
        inventoryMovementsToSave,
      );

      // Actualizar costos de producción
      production.cost = totalCost / quantity;
      production.totalCost = totalCost;

      // Registrar movimiento positivo de inventario
      await this.registerInventoryMovement(
        product,
        quantity,
        production.cost,
        queryRunner,
      );
      await queryRunner.manager.save(Production, production);

      // Actualizar inventario y orden de producción
      await this.updateInventory(
        product.id,
        quantity,
        production.cost,
        queryRunner,
      );
      productionOrder.pending = false;
      await queryRunner.manager.save(ProductionOrder, productionOrder);

      await queryRunner.commitTransaction();
      return savedProduction;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return this.productionRepository.find({
      relations: ['productionOrder', 'productionOrder.product'],
    });
  }

  private createProductionEntity(
    quantity: number,
    productionOrder: ProductionOrder,
    product: any,
  ): Production {
    const production = new Production();
    production.quantity = quantity;
    production.productionOrder = productionOrder;
    production.product = product;
    production.cost = 0;
    production.totalCost = 0;
    return production;
  }

  private async processProductionItems(
    productionItems: any[],
    savedProduction: Production,
    queryRunner: any,
  ) {
    const itemsToSave: ProductionItems[] = [];
    const inventoryMovementsToSave: InventoryMovements[] = [];
    let totalCost = 0;

    for (const itemDto of productionItems) {
      const product = await this.productsService.findOne(itemDto.productId);
      const inventory = product.inventory;

      const productionItem = new ProductionItems();
      productionItem.quantity = itemDto.quantity;
      productionItem.production = savedProduction;
      productionItem.product = product;
      productionItem.cost = inventory.cost;
      itemsToSave.push(productionItem);

      const inventoryMovement = new InventoryMovements();
      inventoryMovement.quantity = -itemDto.quantity;
      inventoryMovement.cost = inventory.cost;
      inventoryMovement.product = product;
      inventoryMovement.movementType =
        await this.inventoryMovementsTypeRepository.findOne({
          where: { id: 1 },
        });
      inventoryMovementsToSave.push(inventoryMovement);

      inventory.quantity -= itemDto.quantity;
      await queryRunner.manager.save(Inventory, inventory);
      totalCost += inventory.cost * itemDto.quantity;
    }

    return { itemsToSave, inventoryMovementsToSave, totalCost };
  }

  private async registerInventoryMovement(
    product: any,
    quantity: number,
    cost: number,
    queryRunner: any,
  ) {
    const inventoryMovement = new InventoryMovements();
    inventoryMovement.quantity = quantity;
    inventoryMovement.cost = cost;
    inventoryMovement.product = product;
    inventoryMovement.movementType =
      await this.inventoryMovementsTypeRepository.findOne({ where: { id: 1 } });
    await queryRunner.manager.save(InventoryMovements, inventoryMovement);
  }

  private async updateInventory(
    productId: number,
    quantity: number,
    productionCost: number,
    queryRunner: any,
  ) {
    const inventory = (await this.productsService.findOne(productId)).inventory;
    const currentCost = +inventory.cost * inventory.quantity;
    const productCost = productionCost * quantity;

    inventory.quantity = +inventory.quantity + quantity;
    inventory.cost = (productCost + currentCost) / +inventory.quantity;
    await queryRunner.manager.save(Inventory, inventory);
  }
}
