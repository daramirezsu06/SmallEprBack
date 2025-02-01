import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { TypeCustomer } from './entities/Type_Customer.entity';
import { UsuarioCustomer } from './entities/Usuario_Customer.entity';
import { PriceList } from './entities/Price_List.entity';
import { PriceListItem } from './entities/Price_List_Item.entity';
import { Seller } from '../seller/entities/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      TypeCustomer,
      UsuarioCustomer,
      PriceList,
      PriceListItem,
      Seller,
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
