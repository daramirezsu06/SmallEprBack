import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { InventoryMovements } from '../../inventories/entities/inventory_movements.entity';

@Entity('purchase')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
  supplier: Supplier;

  @Column({ type: 'numeric' })
  Factura: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @OneToMany(() => InventoryMovements, (movememts) => movememts.purchase)
  InventoryMovements: InventoryMovements[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
