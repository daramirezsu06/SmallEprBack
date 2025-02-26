import { Module } from '@nestjs/common';
import { GeoSegmentationService } from './geo-segmentation.service';
import { GeoSegmentationController } from './geo-segmentation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Neighborhood } from './entities/neighborhood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality, Neighborhood])],
  controllers: [GeoSegmentationController],
  providers: [GeoSegmentationService],
})
export class GeoSegmentationModule {}
