import { Customer } from '../../customer/entities/customer.entity';
import { Seller } from '../../seller/entities/seller.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SellItems } from './sell_items.entity';

@Entity()
export class Sell {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.sells)
  customer: Customer;

  @ManyToOne(() => Seller, (seller) => seller.sells)
  seller: Seller;

  @Column({ type: 'numeric' })
  quantity: number;
  @Column({ type: 'numeric' })
  totalCost: number;

  @Column({ type: 'numeric' })
  totalPrice: number;

  @OneToMany(() => SellItems, (sellItems) => sellItems.sell)
  sellItems: SellItems[];

  @Column({ type: 'boolean', default: false })
  paid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
