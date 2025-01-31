import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryMovements } from '../entities/inventory_movements.entity';
import { Inventory } from '../entities/inventory.entity';
import { MovementType } from '../entities/movement_Type.entity';
import { CreateInventoryMovementsDto } from '../dto/create-inventory-movement.dto';

@Injectable()
export class InventoryMovementsService {
  constructor(
    @InjectRepository(InventoryMovements)
    private inventoryMovementsRepository: Repository<InventoryMovements>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(MovementType)
    private inventoryMovementsTypeRepository: Repository<MovementType>,
  ) {}

  async create(createInventoryMovementsDto: CreateInventoryMovementsDto) {
    const { quantity, cost, movementTypeId, productId } =
      createInventoryMovementsDto;
    const queryRunner =
      this.inventoryMovementsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      // Obtener el tipo de movimiento
      const movementType = await this.inventoryMovementsTypeRepository.findOne({
        where: { id: movementTypeId },
      });
      if (!movementType) {
        throw new Error('Tipo de movimiento no encontrado');
      }

      // Obtener el inventario del producto
      const inventory = await this.inventoryRepository.findOne({
        where: { product: { id: productId } },
        relations: ['product'],
      });
      if (!inventory) {
        throw new Error('Inventario no encontrado');
      }

      // Crear el movimiento de inventario
      const inventoryMovement = new InventoryMovements();
      inventoryMovement.quantity = quantity;
      inventoryMovement.cost = cost ?? inventory.cost;
      inventoryMovement.product = inventory.product;
      inventoryMovement.movementType = movementType;
      await queryRunner.manager.save(InventoryMovements, inventoryMovement);

      // Actualizar el inventario

      if (cost !== undefined) {
        const currentCost = +inventory.cost * +inventory.quantity;
        const productCost = cost * quantity;
        const newinventoryQuantity = +inventory.quantity + quantity;
        inventory.cost = (productCost + currentCost) / newinventoryQuantity;
      }
      inventory.quantity = +inventory.quantity + quantity;
      await queryRunner.manager.save(Inventory, inventory);

      await queryRunner.commitTransaction();
      return inventoryMovement;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll() {
    return await this.inventoryMovementsRepository.find({
      relations: ['movementType', 'product'],
    });
  }
}
