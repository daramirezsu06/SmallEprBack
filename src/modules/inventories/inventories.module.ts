import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovements } from './entities/inventory_movements.entity';
import { Inventory } from './entities/inventory.entity';
import { MovementType } from './entities/movement_Type.entity';
import { InventoryMovementsController } from './controllers/inventory-movements.controller';
import { MovementTypeController } from './controllers/movement-type.controller';
import { MovementTypeService } from './services/movement-type.service';
import { InventoryMovementsService } from './services/inventory-movements.service';
import { InventoriesController } from './controllers/inventories.controller';
import { InventoriesService } from './services/inventories.service';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryMovements,
      Inventory,
      MovementType,
      Product,
    ]),
  ],
  controllers: [
    InventoriesController,
    InventoryMovementsController,
    MovementTypeController,
  ],
  providers: [
    InventoriesService,
    MovementTypeService,
    InventoryMovementsService,
  ],
  exports: [InventoriesService, InventoryMovementsService],
})
export class InventoriesModule {}
