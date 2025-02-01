import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePriceList {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  items: PrieceListItem[];

  @IsNumber()
  @IsOptional()
  sellerId?: number;

  @IsNumber()
  @IsOptional()
  priceListId?: number;
}

export class PrieceListItem {
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
