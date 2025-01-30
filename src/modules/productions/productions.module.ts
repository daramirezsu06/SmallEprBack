import { Module } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { ProductionsController } from './productions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionItems } from './entities/Production_items.entity';
import { Production } from './entities/production.entity';
import { ProductsModule } from '../products/products.module';
import { Inventory } from '../inventories/entities/inventory.entity';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import { ProductionOrdersModule } from '../production-orders/production-orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductionItems,
      Production,
      Inventory,
      InventoryMovements,
      MovementType,
    ]),
    ProductsModule,
    ProductionOrdersModule,
  ],
  controllers: [ProductionsController],
  providers: [ProductionsService],
})
export class ProductionsModule {}
