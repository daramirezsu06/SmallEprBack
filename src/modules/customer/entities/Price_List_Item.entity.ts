import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PriceList } from './Price_List.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('price_list_item')
export class PriceListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  price: number;

  @ManyToOne(() => PriceList, (priceList) => priceList.priceListItems)
  priceList: PriceList;
  @ManyToOne(() => Product, (product) => product.priceListItems)
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
