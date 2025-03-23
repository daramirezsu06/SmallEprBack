import { IsNotEmpty } from 'class-validator';
import { CreateSellItemDto } from './create-sell-item.dto';

export enum typeSell {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
}
export class CreateSellDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  type: typeSell;

  @IsNotEmpty()
  sellItems: CreateSellItemDto[];
}
