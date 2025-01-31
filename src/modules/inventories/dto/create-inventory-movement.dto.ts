import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateInventoryMovementsDto {
  @IsNotEmpty()
  quantity: number;

  @IsEmpty()
  cost?: number;

  @IsNotEmpty()
  movementTypeId: number;

  @IsNotEmpty()
  productId: number;
}
