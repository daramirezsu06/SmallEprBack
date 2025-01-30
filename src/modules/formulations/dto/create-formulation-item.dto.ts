import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateFormulationItemDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsEmpty()
  formulationId?: number;
}
