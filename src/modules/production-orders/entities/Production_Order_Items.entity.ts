import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductionOrder } from './production-order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('Production_Order_Items')
export class ProductionOrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productionOrderItems)
  product: Product;

  @ManyToOne(() => ProductionOrder, (order) => order.productionOrderItems)
  formulations: ProductionOrder;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
