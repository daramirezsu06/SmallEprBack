import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lon?: number;

  @IsString()
  @IsOptional()
  nit?: string;

  @IsString()
  @IsOptional()
  tel?: string;

  @IsNumber()
  @IsNotEmpty()
  customerTypeId: number;

  @IsNumber()
  @IsOptional()
  sellerId?: number;
}
