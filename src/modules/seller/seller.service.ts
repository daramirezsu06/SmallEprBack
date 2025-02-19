import { Injectable } from '@nestjs/common';
import { Seller } from './entities/seller.entity';
import { TypeSeller } from './entities/Type_Seller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeSellerDto } from './dtos/createTypeSellerDto';
import { CreateSellerDto } from './dtos/createSellerDto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    @InjectRepository(TypeSeller)
    private typeSellerRepository: Repository<TypeSeller>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createSeller(createSellerDto: CreateSellerDto) {
    const newSeller = this.sellerRepository.create(createSellerDto);
    const typeOfSeller = await this.typeSellerRepository.findOne({
      where: { id: createSellerDto.typeSellerId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createSellerDto.userId },
    });
    newSeller.user = user;
    newSeller.typeSeller = typeOfSeller;
    return await this.sellerRepository.save(newSeller);
  }
  async createTypeSeller(createTypeSellerDto: CreateTypeSellerDto) {
    const newTypeSeller = this.typeSellerRepository.create(createTypeSellerDto);
    return await this.typeSellerRepository.save(newTypeSeller);
  }
  async getSellers() {
    return await this.sellerRepository.find();
  }
}
