import { IsNotEmpty } from 'class-validator';

export class ProductionItemDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}
