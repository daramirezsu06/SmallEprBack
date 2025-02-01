import { Injectable } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCustomer } from './entities/Type_Customer.entity';
import { Seller } from '../seller/entities/seller.entity';
import { PriceList } from './entities/Price_List.entity';
import { PriceListItem } from './entities/Price_List_Item.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CreatePriceList } from './dtos/create-price-list.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(TypeCustomer)
    private typeCustomerRepository: Repository<TypeCustomer>,
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
    @InjectRepository(PriceListItem)
    private priceListItemRepository: Repository<PriceListItem>,
  ) {}
  async createCustomer(customer: CreateCustomerDto) {
    const customers = await this.customerRepository.create(customer);
    return await this.customerRepository.save(customers);
    return customers;
  }
  async createPriceList(priceList: CreatePriceList) {
    const newPriceList = this.priceListRepository.create(priceList);
    return await this.priceListRepository.save(newPriceList);

    return newPriceList;
  }
}
