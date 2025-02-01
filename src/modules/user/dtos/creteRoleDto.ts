import { IsNotEmpty, IsString } from 'class-validator';

export class CreteRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
