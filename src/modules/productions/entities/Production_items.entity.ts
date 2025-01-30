import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Production } from './production.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('Production_items')
export class ProductionItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'numeric' })
  cost: number;

  @ManyToOne(() => Product, (product) => product.productionItems)
  product: Product;

  @ManyToOne(() => Production, (production) => production.productionItems)
  production: Production;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
