import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { TypeSeller } from './entities/Type_Seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seller, TypeSeller])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
