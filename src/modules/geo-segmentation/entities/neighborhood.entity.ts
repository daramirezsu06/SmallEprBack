import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Municipality } from './municipality.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Neighborhood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;

  @OneToMany(() => Customer, (customer) => customer.neighborhood)
  customers: Customer[];

  @ManyToOne(() => Municipality, (municipality) => municipality.neighborhoods)
  municipality: Municipality;
}
