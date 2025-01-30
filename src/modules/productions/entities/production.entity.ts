import { ProductionOrder } from '../../production-orders/entities/production-order.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductionItems } from './Production_items.entity';
import { InventoryMovements } from '../../inventories/entities/inventory_movements.entity';

@Entity('production')
export class Production {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'numeric' })
  quantity: number;
  @Column({ type: 'numeric' })
  cost: number;

  @Column({ type: 'numeric' })
  totalCost: number;

  @ManyToOne(() => Product, (product) => product.production)
  product: Product;

  @JoinColumn({ name: 'production_order_id' })
  @OneToOne(
    () => ProductionOrder,
    (productionOrder) => productionOrder.production,
  )
  productionOrder: ProductionOrder;
  @OneToMany(
    () => ProductionItems,
    (productionItems) => productionItems.production,
  )
  productionItems: ProductionItems[];

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.production,
  )
  inventoryMovements: InventoryMovements[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
