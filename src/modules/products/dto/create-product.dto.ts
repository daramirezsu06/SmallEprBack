import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  unitId: number;

  @IsNotEmpty()
  @IsNumber()
  typeProductId: number;

  @IsNotEmpty()
  @IsNumber()
  subTypeProductId: number;
}
