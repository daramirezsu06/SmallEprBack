import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { UsuarioCustomer } from './Usuario_Customer.entity';
import { TypeCustomer } from './Type_Customer.entity';
import { Seller } from '../../seller/entities/seller.entity';
import { PriceList } from './Price_List.entity';
import { Sell } from '../../sells/entities/sell.entity';
import { Neighborhood } from '../../geo-segmentation/entities/neighborhood.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nit: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  tel: string;

  @ManyToOne(() => TypeCustomer, (typecustomer) => typecustomer.customers, {
    nullable: false,
  })
  typeCustomer: TypeCustomer;

  @ManyToOne(() => Seller, (seller) => seller.customers, { nullable: true })
  seller: Seller;

  @OneToOne(
    () => UsuarioCustomer,
    (usuarioCustomer) => usuarioCustomer.customer,
  )
  usuarioCustomers: UsuarioCustomer;

  @ManyToOne(() => PriceList, (priceList) => priceList.customers)
  priceList: PriceList;

  @ManyToOne(() => Neighborhood, (neighborhood) => neighborhood.customers)
  neighborhood: Neighborhood;

  @OneToMany(() => Sell, (sell) => sell.customer)
  sells: Sell[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
