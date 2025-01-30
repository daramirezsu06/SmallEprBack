import { PartialType } from '@nestjs/mapped-types';
import { CreatePreloadDatumDto } from './create-preload-datum.dto';

export class UpdatePreloadDatumDto extends PartialType(CreatePreloadDatumDto) {}
