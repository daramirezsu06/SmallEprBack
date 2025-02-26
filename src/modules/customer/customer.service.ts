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
import { Neighborhood } from '../geo-segmentation/entities/neighborhood.entity';

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
    @InjectRepository(Neighborhood)
    private neighborhoodRepository: Repository<Neighborhood>,
  ) {}
  async createCustomer(customer: CreateCustomerDto) {
    const neighborhood = await this.neighborhoodRepository.findOne({
      where: { id: customer.neighborhoodId },
    });
    const customertype = await this.typeCustomerRepository.findOne({
      where: { id: customer.customerTypeId },
    });
    const seller = await this.sellerRepository.findOne({
      where: { id: customer.sellerId },
    });
    const priceList = await this.priceListRepository.findOne({
      where: { id: customer.priceListId },
    });
    const newCustomer = this.customerRepository.create();
    newCustomer.name = customer.name;
    newCustomer.address = customer.address;
    newCustomer.lat = customer.lat || 0;
    newCustomer.lon = customer.lon || 0;
    newCustomer.nit = customer.nit || '';
    newCustomer.tel = customer.tel || '';
    newCustomer.typeCustomer = customertype;
    newCustomer.seller = seller;
    newCustomer.priceList = priceList;
    newCustomer.neighborhood = neighborhood;
    return await this.customerRepository.save(newCustomer);
  }

  async createPriceList(priceList: CreatePriceList) {
    const newPriceList = this.priceListRepository.create(priceList);
    return await this.priceListRepository.save(newPriceList);

    return newPriceList;
  }
  async getCustomers() {
    return await this.customerRepository.find({
      relations: ['seller', 'priceList.priceListItems.product'],
    });
  }
  async getCustomerType() {
    return await this.typeCustomerRepository.find();
  }
  async getPriceList() {
    return await this.priceListRepository.find({
      relations: ['priceListItems.product'],
    });
  }
}
