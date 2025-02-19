import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity('supplier')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'float', nullable: true })
  NIT: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  tel: string;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
