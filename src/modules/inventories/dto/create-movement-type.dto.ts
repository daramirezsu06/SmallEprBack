import { IsNotEmpty } from 'class-validator';

export class CreateMovementTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
