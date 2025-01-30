import { IsNotEmpty } from 'class-validator';

export class CreateProductionOrderDto {
  @IsNotEmpty()
  formulationId: number;

  @IsNotEmpty()
  quantity: number;
}
