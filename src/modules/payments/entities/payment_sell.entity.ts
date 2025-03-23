import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';
import { Sell } from '../../sells/entities/sell.entity';

@Entity()
export class PaymentSell {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Payment, (payment) => payment.paymentSells)
  payment: Payment;

  @ManyToOne(() => Sell, (sell) => sell.paymentSells)
  sell: Sell;

  @Column({ type: 'numeric' })
  allocatedAmount: number; // Monto asignado a esta venta específica
}
