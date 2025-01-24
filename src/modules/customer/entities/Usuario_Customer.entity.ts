import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity'; // Ajusta las rutas según sea necesario
import { User } from '../../user/entities/user.entity';

@Entity('usuario_customer')
export class UsuarioCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.usuarioCustomers, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Customer, (customer) => customer.usuarioCustomers, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
