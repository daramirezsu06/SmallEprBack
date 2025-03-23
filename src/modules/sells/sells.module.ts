import { Module } from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sell } from './entities/sell.entity';
import { SellItems } from './entities/sell_items.entity';
import { Product } from '../products/entities/product.entity';
import { Seller } from '../seller/entities/seller.entity';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import { PaymentSell } from '../payments/entities/payment_sell.entity';
import { Payment } from '../payments/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sell,
      SellItems,
      Product,
      Seller,
      InventoryMovements,
      Inventory,
      Customer,
      MovementType,
      Payment,
      PaymentSell,
    ]),
  ],
  controllers: [SellsController],
  providers: [SellsService],
})
export class SellsModule {}
