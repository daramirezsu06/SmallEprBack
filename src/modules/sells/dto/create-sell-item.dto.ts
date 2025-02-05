import { IsNotEmpty } from 'class-validator';

export class CreateSellItemDto {
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  price: number;
}
