import { Module } from '@nestjs/common';
import { PreloadDataService } from './preload-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { SubTypeProduct } from '../products/entities/sub_type_product.entity';
import { TypeProduct } from '../products/entities/type_product.entity';
import { Unit } from '../products/entities/unit.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      SubTypeProduct,
      TypeProduct,
      Unit,
      Inventory,
      MovementType,
    ]),
  ],
  providers: [PreloadDataService],
  exports: [PreloadDataService],
})
export class PreloadDataModule {}
