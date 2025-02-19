import { IsNotEmpty } from 'class-validator';
import { CreateInventoryMovementsDto } from 'src/modules/inventories/dto/create-inventory-movement.dto';

export class CreatePurchaseDto {
  @IsNotEmpty()
  supplierId: number;

  @IsNotEmpty()
  Factura: number;

  @IsNotEmpty()
  data: Date;

  @IsNotEmpty()
  CreateInventoryMovementsDto: CreateInventoryMovementsDto[];
}

