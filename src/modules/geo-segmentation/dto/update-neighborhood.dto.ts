import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateNeighborhoodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsNumber()
  @IsNotEmpty()
  municipalityId: number;
}
