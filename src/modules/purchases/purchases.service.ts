import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Supplier } from './entities/supplier.entity';

import { InventoryMovementsService } from '../inventories/services/inventory-movements.service';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { CreateSupplierDto } from './dto/create-suppler.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private inventoriesMovementsService: InventoryMovementsService,
  ) {}
  async create(createPurchaseDto: CreatePurchaseDto) {
    const { supplierId, Factura, data, CreateInventoryMovementsDto } =
      createPurchaseDto;
    const queryRunner =
      this.purchaseRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const supplier = await queryRunner.manager.findOne(Supplier, {
        where: { id: supplierId },
      });

      const purchase = new Purchase();
      purchase.supplier = supplier;
      purchase.Factura = Factura;
      purchase.data = data;
      await queryRunner.manager.save(Purchase, purchase);

      for (const createInventoryMovementsDto of CreateInventoryMovementsDto) {
        const inventoryMovements =
          await this.inventoriesMovementsService.createWithManager(
            createInventoryMovementsDto,
            queryRunner.manager, // ⬅️ Pasamos el manager del queryRunner
          );
        inventoryMovements.purchase = purchase;
        await queryRunner.manager.save(InventoryMovements, inventoryMovements);
      }

      await queryRunner.commitTransaction();
      return purchase;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createSupplier(supplier: CreateSupplierDto) {
    const newSupplier = this.supplierRepository.create();
    newSupplier.name = supplier.name;
    newSupplier.address = supplier.address;
    newSupplier.NIT = supplier.NIT;
    newSupplier.tel = supplier.tel;
    return await this.supplierRepository.save(newSupplier);
  }
  async findAllPurchases() {
    return await this.purchaseRepository.find({
      relations: ['supplier'],
    });
  }
  async findAllSuppliers() {
    return await this.supplierRepository.find();
  }
}
