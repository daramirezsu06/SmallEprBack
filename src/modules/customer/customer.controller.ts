import { Controller, Get, Post } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreatePriceList } from './dtos/create-price-list.dto';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(customer: CreateCustomerDto) {
    return this.customerService.createCustomer(customer);
  }
  @Post('priceList')
  createPriceList(priceList: CreatePriceList) {
    return this.customerService.createPriceList(priceList);
  }
  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }
  @Get('typeCustomer')
  getCustomerType() {
    return this.customerService.getCustomerType();
  }
}
