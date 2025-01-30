import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  productId: number;
}
