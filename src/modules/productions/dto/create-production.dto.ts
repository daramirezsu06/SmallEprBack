import { IsNotEmpty } from 'class-validator';
import { ProductionItemDto } from './create-production-item.dto';

export class CreateProductionDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  productionOrderId: number;

  @IsNotEmpty()
  productionItems: ProductionItemDto[];
}
