import { Seller } from '../../seller/entities/seller.entity';
import { UsuarioCustomer } from '../../customer/entities/Usuario_Customer.entity';
import { Role } from './role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;

  @OneToOne(() => UsuarioCustomer, (usuarioCustomer) => usuarioCustomer.user)
  usuarioCustomers: UsuarioCustomer;

  @OneToOne(() => Seller, (seller) => seller.user)
  seller: Seller;
}
