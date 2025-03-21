import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeOfProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  acronyms: string;
}
