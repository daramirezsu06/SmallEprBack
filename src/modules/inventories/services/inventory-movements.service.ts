import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryMovements } from '../entities/inventory_movements.entity';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { CreateInventoryMovementsDto } from '../dto/create-inventory-movement.dto';
import { MovementType } from '../entities/movement_Type.entity';

@Injectable()
export class InventoryMovementsService {
  //   constructor(
  //     @InjectRepository(InventoryMovements)
  //     private inventoryMovementsRepository: Repository<InventoryMovements>,
  //     @InjectRepository(Inventory)
  //       private inventoryRepository: Repository<Inventory>,
  //      @InjectRepository(MovementType)
  //       private inventoryMovementsTypeRepository: Repository<MovementType>,
  //   ) {}
  //     async Create(inventoryMovementdto: CreateInventoryMovementsDto) {
  //     const { quantity, cost, movementTypeId, inventoryId } = inventoryMovementdto;
  //     const inventory = await this.inventoryRepository.findOne({ where: { id: inventoryId } });
  //         const inventoryMovementType = await this.inventoryMovementsTypeRepository.findOne({ where: { id: movementTypeId } });
  //         const product = await this.inventoryMovementsRepository.findOne({ where: { id: inventoryId } });
  //     const inventoryMovement = this.inventoryMovementsRepository.create({
  //       quantity: inventoryMovementdto.quantity,
  //       cost: inventoryMovementdto.cost,
  //       movementType: inventoryMovementType,
  //       product: await this.inventoryMovementsRepository.findOne({where: {id: inventoryMovementdto.productId}}),
  //       production: await this.inventoryMovementsRepository.findOne({where: {id: inventoryMovementdto.productionId}}),
  //     });
  //     );
  //   }
}
