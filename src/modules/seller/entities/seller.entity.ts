import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TypeSeller } from './Type_Seller.entity';
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { Sell } from '../../sells/entities/sell.entity';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  cedula: string;

  // Relación con la entidad User (un vendedor tiene un usuario asociado)
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación con el tipo de vendedor (cada vendedor tiene un tipo)
  @ManyToOne(() => TypeSeller, (typeSeller) => typeSeller.sellers, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_seller_id' })
  typeSeller: TypeSeller;

  // Otros campos que puedan ser necesarios según tu lógica
  @OneToMany(() => Customer, (customer) => customer.seller, { nullable: true })
  customers: Customer[];

  @OneToMany(() => Sell, (sell) => sell.seller, { nullable: true })
  sells: Sell[];
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
