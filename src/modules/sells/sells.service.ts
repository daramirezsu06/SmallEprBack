import { Injectable } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sell } from './entities/sell.entity';
import { Repository } from 'typeorm';
import { SellItems } from './entities/sell_items.entity';
import { Product } from '../products/entities/product.entity';
import { Seller } from '../seller/entities/seller.entity';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(Sell) private sellRepository: Repository<Sell>,
    @InjectRepository(SellItems)
    private sellItemsRepository: Repository<SellItems>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
    @InjectRepository(InventoryMovements)
    private inventoryMovementsRepository: Repository<InventoryMovements>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
  ) {}
  async create(createSellDto: CreateSellDto) {
    const { sellerId, customerId, sellItems, paid } = createSellDto;
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
    });
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    const queryRunner =
      this.sellRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const sell = new Sell();
      sell.seller = seller;
      sell.paid = paid;
      sell.customer = customer;
      sell.quantity = 0;
      sell.totalCost = 0;
      sell.totalPrice = 0;

      await queryRunner.manager.save(Sell, sell);

      let totalCost = 0;
      let totalPrice = 0;
      let totalQuantity = 0;

      for (const sellItem of sellItems) {
        const product = await this.productRepository.findOne({
          where: { id: sellItem.productId },
        });
        const inventoryMovements = new InventoryMovements();

        const inventory = await this.inventoryRepository.findOne({
          where: { product: product },
        });

        inventoryMovements.quantity = sellItem.quantity;
        inventoryMovements.cost = inventory.cost;
        inventoryMovements.product = product;
        inventoryMovements.movementType =
          await this.movementTypeRepository.findOne({ where: { id: 1 } });
        await queryRunner.manager.save(InventoryMovements, inventoryMovements);

        const sellItemEntity = new SellItems();
        sellItemEntity.sell = sell;
        sellItemEntity.product = product;
        sellItemEntity.quantity = sellItem.quantity;
        sellItemEntity.cost = inventory.cost;
        sellItemEntity.price = sellItem.price;
        sellItemEntity.inventoryMovements = inventoryMovements;

        totalCost = totalCost + +inventory.cost * +sellItem.quantity;
        totalPrice = totalCost + +sellItem.price * +sellItem.quantity;
        totalQuantity = +totalQuantity + +sellItem.quantity;

        await queryRunner.manager.save(SellItems, sellItemEntity);
      }

      sell.quantity = totalQuantity;
      sell.totalCost = totalCost;
      sell.totalPrice = totalPrice;
      await queryRunner.manager.save(Sell, sell);

      await queryRunner.commitTransaction();
      return sell;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll() {
    return await this.sellRepository.find({
      relations: ['seller', 'customer', 'sellItems'],
    });
  }

  async findOne(id: number) {
    return await this.sellRepository.findOne({
      where: { id: id },
      relations: ['seller', 'customer', 'sellItems'],
    });
  }
}
