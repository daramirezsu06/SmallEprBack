import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMunicipalityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;
}
