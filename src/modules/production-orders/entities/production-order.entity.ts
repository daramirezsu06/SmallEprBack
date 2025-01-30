import { Formulation } from '../../formulations/entities/formulation.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductionOrderItems } from './Production_Order_Items.entity';
import { Production } from '../../productions/entities/production.entity';

@Entity('production-order')
export class ProductionOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.productionOrder)
  product: Product;

  @ManyToOne(() => Formulation, (formulation) => formulation.productionOrder)
  formulations: Formulation;
  @OneToMany(
    () => ProductionOrderItems,
    (productionOrderItems) => productionOrderItems.formulations,
  )
  productionOrderItems: ProductionOrderItems[];
  @Column({ type: 'boolean', default: true })
  pending: boolean;

  @OneToOne(() => Production, (production) => production.productionOrder)
  production: Production;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
