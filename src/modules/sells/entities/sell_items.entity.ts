import { InventoryMovements } from 'src/modules/inventories/entities/inventory_movements.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sell } from './sell.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity()
export class SellItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sell, (sell) => sell.sellItems)
  sell: Sell;

  @ManyToOne(() => Product, (product) => product.sellItems)
  product: Product;

  @JoinColumn()
  @OneToOne(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.sellItems,
  )
  inventoryMovements: InventoryMovements;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'numeric', nullable: true })
  cost: number;

  @Column({ type: 'numeric', nullable: true })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
