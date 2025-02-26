import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Neighborhood } from './neighborhood.entity';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  lat: number;

  @Column({ type: 'float', nullable: true })
  lon: number;

  @OneToMany(() => Neighborhood, (neighborhood) => neighborhood.municipality)
  neighborhoods: Neighborhood[];
}
