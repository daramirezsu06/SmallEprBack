import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seller } from './seller.entity'; // Asegúrate de que la ruta sea correcta

@Entity('type_seller')
export class TypeSeller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  // Relación con la entidad Seller (un TypeSeller puede tener muchos Sellers)
  @OneToMany(() => Seller, (seller) => seller.typeSeller)
  sellers: Seller[];
}
