import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Unit } from './unit.entity';
import { TypeProduct } from './type_product.entity';
import { InventoryMovements } from '../../inventories/entities/inventory_movements.entity';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { Formulation } from '../../formulations/entities/formulation.entity';
import { FormulationsItems } from '../../formulations/entities/Formulations_Items.entity';
import { ProductionOrder } from '../../production-orders/entities/production-order.entity';
import { ProductionOrderItems } from '../../production-orders/entities/Production_Order_Items.entity';
import { Production } from '../../productions/entities/production.entity';
import { ProductionItems } from '../../productions/entities/Production_items.entity';
import { SubTypeProduct } from './sub_type_product.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => Unit, (unit) => unit.products)
  unit: Unit;

  @ManyToOne(() => TypeProduct, (typeProduct) => typeProduct.products)
  typeProduct: TypeProduct;

  @ManyToOne(() => SubTypeProduct, (subType) => subType.products)
  subTypeProduct: SubTypeProduct;

  @OneToMany(
    () => InventoryMovements,
    (inventoryMovements) => inventoryMovements.product,
  )
  inventoryMovements: InventoryMovements[];

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;
  @OneToMany(() => Formulation, (formulation) => formulation.product)
  formulation: Formulation[];

  @OneToMany(
    () => FormulationsItems,
    (formulationsItems) => formulationsItems.product,
  )
  formulationItems: FormulationsItems[];

  @OneToMany(() => ProductionOrder, (order) => order.product)
  productionOrder: ProductionOrder[];

  @OneToMany(
    () => ProductionOrderItems,
    (productionOrderItems) => productionOrderItems.product,
  )
  productionOrderItems: ProductionOrderItems[];

  @OneToMany(() => Production, (production) => production.product)
  production: Production[];

  @OneToMany(
    () => ProductionItems,
    (productionItems) => productionItems.product,
  )
  productionItems: ProductionItems[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updateDate: Date;
}
