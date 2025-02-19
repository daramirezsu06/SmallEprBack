import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Purchase } from './entities/purchase.entity';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Product } from '../products/entities/product.entity';
import { InventoriesModule } from '../inventories/inventories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, Purchase, InventoryMovements, Product]),
    InventoriesModule,
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
