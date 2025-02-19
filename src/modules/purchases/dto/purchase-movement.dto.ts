import { IsEmpty, IsNotEmpty } from 'class-validator';

export class PurchaseMovementDto {
  @IsNotEmpty()
  quantity: number;

  @IsEmpty()
  cost?: number;

  @IsNotEmpty()
  productId: number;
}
