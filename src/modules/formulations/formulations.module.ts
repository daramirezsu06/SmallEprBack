import { Module } from '@nestjs/common';
import { FormulationsService } from './formulations.service';
import { FormulationsController } from './formulations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulation } from './entities/formulation.entity';
import { FormulationsItems } from './entities/Formulations_Items.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Formulation, FormulationsItems]),
    ProductsModule,
  ],
  controllers: [FormulationsController],
  providers: [FormulationsService],
  exports: [FormulationsService],
})
export class FormulationsModule {}
