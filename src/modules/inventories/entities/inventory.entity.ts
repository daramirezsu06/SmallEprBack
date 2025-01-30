import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  cost: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @JoinColumn({ name: 'product_id' })
  @OneToOne(() => Product, (product) => product.inventory)
  product: Product;
}
