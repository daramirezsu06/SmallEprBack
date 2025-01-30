import { IsNotEmpty } from 'class-validator';
import { CreateFormulationItemDto } from './create-formulation-item.dto';

export class CreateFormulationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  items: CreateFormulationItemDto[];
}
