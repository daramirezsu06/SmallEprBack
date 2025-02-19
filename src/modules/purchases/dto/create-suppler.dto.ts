import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  NIT: string;

  @IsNotEmpty()
  tel: string;
}
