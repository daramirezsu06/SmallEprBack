import { IsNotEmpty } from 'class-validator';
import { CreateSellItemDto } from './create-sell-item.dto';

export class CreateSellDto {
  @IsNotEmpty()
  sellerId: number;

  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  paid: boolean;

  @IsNotEmpty()
  sellItems: CreateSellItemDto[];
}
