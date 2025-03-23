import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Seller } from 'src/modules/seller/entities/seller.entity';
import { SellItems } from '../entities/sell_items.entity';
import { PaymentSell } from 'src/modules/payments/entities/payment_sell.entity';

export enum SellStatus {
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PENDING = 'PENDING',
}

export interface SellResponseDto {
  id: number;
  quantity: number;
  totalCost: number;
  totalPrice: number;
  createDate: Date;
  updateDate?: Date;
  seller: Seller;
  customer: Customer;
  sellItems: SellItems[];
  paymentSells: PaymentSell[];
  status: SellStatus; // Campo calculado
}
