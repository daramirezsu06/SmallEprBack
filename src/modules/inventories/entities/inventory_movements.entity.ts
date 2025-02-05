import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovementType } from './movement_Type.entity';
import { Product } from '../../products/entities/product.entity';
import { Production } from '../../productions/entities/production.entity';
import { SellItems } from 'src/modules/sells/entities/sell_items.entity';

@Entity('inventory_movements')
export class InventoryMovements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'numeric' })
  cost: number;

  @ManyToOne(
    () => MovementType,
    (movementType) => movementType.inventoryMovements,
  )
  movementType: MovementType;

  @ManyToOne(() => Product, (product) => product.inventoryMovements)
  product: Product;

  @OneToOne(() => Production, (production) => production.inventoryMovements)
  production: Production;
  @OneToOne(() => SellItems, (sellItems) => sellItems.inventoryMovements)
  sellItems: SellItems;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
