import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { TypeProduct } from './type_product.entity';

@Entity('Sub_Type_Product')
export class SubTypeProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => Product, (product) => product.subTypeProduct)
  products: Product[];

  @ManyToOne(() => TypeProduct, (typeProduct) => typeProduct.subTypeProduct)
  typeProduct: TypeProduct;

  @Column({ type: 'varchar', length: 255 })
  acronyms: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
