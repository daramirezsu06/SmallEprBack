import { Injectable } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionOrder } from './entities/production-order.entity';
import { FormulationsService } from '../formulations/formulations.service';
import { ProductionOrderItems } from './entities/Production_Order_Items.entity';

@Injectable()
export class ProductionOrdersService {
  constructor(
    @InjectRepository(ProductionOrder)
    private readonly productionOrderRepository: Repository<ProductionOrder>,
    private readonly formulationService: FormulationsService,
  ) {}
  async create(createProductionOrderDto: CreateProductionOrderDto) {
    const formulation = await this.formulationService.findOne(
      createProductionOrderDto.formulationId,
    );
    const product = formulation.product;
    const formulationItems = formulation.formulationItems;

    const proportion = createProductionOrderDto.quantity / formulation.cuantity;
    const queryRunner =
      this.productionOrderRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Paso 1: Crear la orden de producción
      const productionOrder = new ProductionOrder();
      productionOrder.quantity = createProductionOrderDto.quantity;
      productionOrder.product = product;
      productionOrder.formulations = formulation;

      // Guardamos la orden de producción en la base de datos
      const savedProductionOrder = await queryRunner.manager.save(
        ProductionOrder,
        productionOrder,
      );
      // Paso 2: Crear los items de la orden de producción
      const itemsToSave: ProductionOrderItems[] = [];
      for (const itemDto of formulationItems) {
        const productionOrderItem = new ProductionOrderItems();
        productionOrderItem.quantity = itemDto.quantity * proportion;
        productionOrderItem.product = itemDto.product;
        productionOrderItem.formulations = savedProductionOrder;

        itemsToSave.push(productionOrderItem);
      }
      // Guardamos los items de la orden de producción
      await queryRunner.manager.save(ProductionOrderItems, itemsToSave);

      // Commit de la transacción
      await queryRunner.commitTransaction();
      // Ahora devolvemos la orden de producción con los items incluidos
      const result = await this.productionOrderRepository.findOne({
        where: { id: savedProductionOrder.id },
        relations: [
          'product',
          'productionOrderItems',
          'productionOrderItems.product',
        ],
      });

      return result;
    } catch (error) {
      // Si algo falla, revertimos la transacción
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Cerramos el QueryRunner
      await queryRunner.release();
    }
  }

  async findOne(id: number) {
    return await this.productionOrderRepository.findOne({
      where: { id },
      relations: [
        'product',
        'productionOrderItems',
        'productionOrderItems.product',
        'productionOrderItems.product.unit',
      ],
    });
  }
  async findAll() {
    return await this.productionOrderRepository.find({
      relations: [
        'product',
        'formulations',
        'productionOrderItems',
        'productionOrderItems.product',
        'productionOrderItems.product.unit',
      ],
    });
  }
}
