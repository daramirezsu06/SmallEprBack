import { Injectable } from '@nestjs/common';
import { CreateFormulationDto } from './dto/create-formulation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulation } from './entities/formulation.entity';
import { FormulationsItems } from './entities/Formulations_Items.entity';
import { ProductsService } from '../products/services/products.service';

@Injectable()
export class FormulationsService {
  constructor(
    @InjectRepository(Formulation)
    private readonly formulationsRepository: Repository<Formulation>,

    @InjectRepository(FormulationsItems)
    private readonly formulationsItemsRepository: Repository<FormulationsItems>,

    private readonly productService: ProductsService,
  ) {}

  async create(
    createFormulationDto: CreateFormulationDto,
  ): Promise<Formulation> {
    const queryRunner =
      this.formulationsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // Paso 1: Crear la formulación
      const formulation = new Formulation();
      formulation.name = createFormulationDto.name;
      formulation.description = createFormulationDto.description;
      formulation.cuantity = createFormulationDto.quantity;
      formulation.product = await this.productService.findOne(
        createFormulationDto.productId,
      );

      // Guardamos la formulación en la base de datos
      const savedFormulation = await queryRunner.manager.save(
        Formulation,
        formulation,
      );

      // Paso 2: Crear los items de la formulación
      const itemsToSave: FormulationsItems[] = [];
      for (const itemDto of createFormulationDto.items) {
        const formulationItem = new FormulationsItems();
        formulationItem.quantity = itemDto.quantity;
        formulationItem.product = await this.productService.findOne(
          itemDto.productId,
        );
        formulationItem.formulations = savedFormulation;

        itemsToSave.push(formulationItem);
      }

      // Guardamos los items de la formulación
      await queryRunner.manager.save(FormulationsItems, itemsToSave);

      // Commit de la transacción
      await queryRunner.commitTransaction();
      return savedFormulation;
    } catch (error) {
      // Si algo falla, revertimos la transacción
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Cerramos el QueryRunner
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.formulationsRepository.find({ relations: ['product'] });
  }

  async findOne(id: number) {
    return await this.formulationsRepository.findOne({
      where: { id },
      relations: ['product', 'formulationItems', 'formulationItems.product'], // Usamos 'relations' en minúsculas
    });
  }
}
