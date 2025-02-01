import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PriceListItem } from './Price_List_Item.entity';
import { Customer } from './customer.entity';

@Entity('price_list')
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => PriceListItem, (priceListItem) => priceListItem.priceList)
  priceListItems: PriceListItem[];

  @OneToMany(() => Customer, (customer) => customer.priceList)
  customers: Customer[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
