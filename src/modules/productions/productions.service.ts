import { Injectable } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Production } from './entities/production.entity';
import { ProductionItems } from './entities/Production_items.entity';
import { ProductsService } from '../products/services/products.service';
import { ProductionOrdersService } from '../production-orders/production-orders.service';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import { ProductionOrder } from '../production-orders/entities/production-order.entity';

@Injectable()
export class ProductionsService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(ProductionItems)
    private readonly productionItemsRepository: Repository<ProductionItems>,
    @InjectRepository(InventoryMovements)
    private inventoryMovementsRepository: Repository<InventoryMovements>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(MovementType)
    private inventoryMovementsTypeRepository: Repository<MovementType>,
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
      // Paso 1: Crear la producción
      const production = new Production();
      production.quantity = quantity;
      production.productionOrder = productionOrder;
      production.product = product;
      production.cost = 0;
      production.totalCost = 0;

      // Guardamos la producción en la base de datos
      const savedProduction = await queryRunner.manager.save(
        Production,
        production,
      );
      // Paso 2: Crear los items de la producción
      const itemsToSave: ProductionItems[] = [];
      const inventoryMovemeToSave: InventoryMovements[] = [];
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
        console.log(product.name, inventory);

        const inventoryMovement = new InventoryMovements();
        inventoryMovement.quantity = -itemDto.quantity;
        inventoryMovement.cost = inventory.cost;
        inventoryMovement.product = product;
        inventoryMovement.movementType =
          await this.inventoryMovementsTypeRepository.findOne({
            where: { id: 1 },
          });
        inventoryMovemeToSave.push(inventoryMovement);

        inventory.quantity -= itemDto.quantity;
        console.log('esta e sla nueva quantity', inventory.quantity);

        await queryRunner.manager.save(Inventory, inventory);

        totalCost += inventory.cost * itemDto.quantity;
      }

      // Guardamos los items de la producción
      await queryRunner.manager.save(ProductionItems, itemsToSave);

      // Paso 3: Crear los movimientos de inventario
      await queryRunner.manager.save(InventoryMovements, inventoryMovemeToSave);

      // Paso 4: Actualizar inventarios

      // Paso 5: Actualizar costo de producción
      production.cost = totalCost / +quantity;
      production.totalCost = totalCost;
      const inventoryMovement = new InventoryMovements();
      inventoryMovement.quantity = quantity;
      inventoryMovement.cost = production.cost;
      inventoryMovement.product = product;
      inventoryMovement.movementType =
        await this.inventoryMovementsTypeRepository.findOne({
          where: { id: 1 },
        });
      await queryRunner.manager.save(InventoryMovements, inventoryMovement);
      await queryRunner.manager.save(Production, production);
      console.log('movimiento de inventarios guardado', inventoryMovemeToSave);
      console.log('prodyction saved', production);

      console.log('-----------------/////////---------------');

      // Paso 6: cambio positivo de inventario de la producción
      const inventory = (await this.productsService.findOne(product.id))
        .inventory;
      console.log('inventario a actualizar', inventory);

      inventory.quantity = +inventory.quantity + quantity;
      console.log('costo produccion', production.cost);

      const currentCost = +inventory.cost * inventory.quantity;
      const productCost = +production.cost * quantity;
      inventory.cost =
        (productCost + currentCost) / (quantity + inventory.quantity);

      await queryRunner.manager.save(Inventory, inventory);
      console.log('inventario actualizado', inventory);

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
    return await this.productionRepository.find({
      relations: ['productionOrder', 'productionOrder.product'],
    });
  }
}
