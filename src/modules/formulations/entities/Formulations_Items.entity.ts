import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Formulation } from './formulation.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('Formulations_Items')
export class FormulationsItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.formulationItems)
  product: Product;

  @ManyToOne(() => Formulation, (formulation) => formulation.formulationItems)
  formulations: Formulation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
