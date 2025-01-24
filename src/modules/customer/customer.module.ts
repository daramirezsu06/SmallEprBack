import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { TypeCustomer } from './entities/Type_Customer.entity';
import { UsuarioCustomer } from './entities/Usuario_Customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, TypeCustomer, UsuarioCustomer]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
