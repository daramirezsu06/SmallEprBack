import { Module } from '@nestjs/common';
import { PreloadDataService } from './preload-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { SubTypeProduct } from '../products/entities/sub_type_product.entity';
import { TypeProduct } from '../products/entities/type_product.entity';
import { Unit } from '../products/entities/unit.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../user/entities/role.entity';
import { Seller } from '../seller/entities/seller.entity';
import { TypeSeller } from '../seller/entities/Type_Seller.entity';
import { PriceList } from '../customer/entities/Price_List.entity';
import { PriceListItem } from '../customer/entities/Price_List_Item.entity';
import { Customer } from '../customer/entities/customer.entity';
import { TypeCustomer } from '../customer/entities/Type_Customer.entity';
import { Municipality } from '../geo-segmentation/entities/municipality.entity';
import { Neighborhood } from '../geo-segmentation/entities/neighborhood.entity';
import { Sell } from '../sells/entities/sell.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      SubTypeProduct,
      TypeProduct,
      Unit,
      Inventory,
      MovementType,
      User,
      Role,
      Seller,
      User,
      TypeSeller,
      PriceList,
      PriceListItem,
      Customer,
      TypeCustomer,
      Municipality,
      Neighborhood,
      Sell,
    ]),
  ],
  providers: [PreloadDataService],
  exports: [PreloadDataService],
})
export class PreloadDataModule {}
