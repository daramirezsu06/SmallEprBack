import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentSell } from './payment_sell.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  amount: number; // Monto total del pago

  @Column({
    type: 'enum',
    enum: ['CASH', 'CREDIT', 'TRANSFER', 'OTHER'],
    default: 'CASH',
  })
  paymentType: string; // Tipo de pago

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date; // Fecha del pago

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string; // Notas opcionales

  @OneToMany(() => PaymentSell, (paymentSell) => paymentSell.payment)
  paymentSells: PaymentSell[]; // Relación con la tabla intermedia
}
