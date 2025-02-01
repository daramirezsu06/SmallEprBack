import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  cedula: string;
  @IsEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  typeSellerId: number;
}
