import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { TypeProduct } from './entities/type_product.entity';
import { Unit } from './entities/unit.entity';
import { UnitsController } from './controllers/units.controller';
import { TypeOfProductController } from './controllers/type-of-product.controller';
import { UnitsService } from './services/units.service';
import { TypeOfProductService } from './services/type-of-product.service';
import { InventoriesModule } from '../inventories/inventories.module';
import { SubTypeProduct } from './entities/sub_type_product.entity';
import { PriceListItem } from '../customer/entities/Price_List_Item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      TypeProduct,
      Unit,
      SubTypeProduct,
      PriceListItem,
    ]),
    InventoriesModule,
  ],
  controllers: [ProductsController, UnitsController, TypeOfProductController],
  providers: [ProductsService, UnitsService, TypeOfProductService],
  exports: [ProductsService],
})
export class ProductsModule {}
