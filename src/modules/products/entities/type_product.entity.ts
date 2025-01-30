import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { SubTypeProduct } from './sub_type_product.entity';

@Entity('Type_Product')
export class TypeProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @OneToMany(() => Product, (product) => product.typeProduct)
  products: Product[];
  @OneToMany(
    () => SubTypeProduct,
    (subTypeProduct) => subTypeProduct.typeProduct,
  )
  subTypeProduct: SubTypeProduct[];

  @Column({ type: 'varchar', length: 255 })
  acronyms: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
