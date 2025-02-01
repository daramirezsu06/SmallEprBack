import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeSellerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
