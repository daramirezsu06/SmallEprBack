import { Injectable } from '@nestjs/common';
import { Seller } from './entities/seller.entity';
import { TypeSeller } from './entities/Type_Seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeSellerDto } from './dtos/createTypeSellerDto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    @InjectRepository(TypeSeller)
    private typeSellerRepository: Repository<TypeSeller>,
  ) {}
  async createTypeSeller(createTypeSellerDto: CreateTypeSellerDto) {
    const newTypeSeller = this.typeSellerRepository.create(createTypeSellerDto);
    return await this.typeSellerRepository.save(newTypeSeller);
  }
}
