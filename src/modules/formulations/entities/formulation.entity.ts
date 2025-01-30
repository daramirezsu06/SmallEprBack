import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormulationsItems } from './Formulations_Items.entity';
import { ProductionOrder } from '../../production-orders/entities/production-order.entity';

@Entity('formulation')
export class Formulation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'numeric' })
  cuantity: number;

  @ManyToOne(() => Product, (product) => product.formulation)
  product: Product;

  @OneToMany(
    () => FormulationsItems,
    (formulationsItems) => formulationsItems.formulations,
  )
  formulationItems: FormulationsItems[];

  @OneToMany(
    () => ProductionOrder,
    (productionOrder) => productionOrder.formulations,
  )
  productionOrder: ProductionOrder[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
