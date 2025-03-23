import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';

// Enum para los tipos de pago
export enum PaymentType {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  TRANSFER = 'TRANSFER',
  OTHER = 'OTHER',
}

// DTO para la asignación de monto a una venta específica
export class PaymentAllocationDto {
  @IsNumber()
  sellId: number; // ID de la venta a la que se asigna el monto

  @IsNumber()
  @Min(0)
  allocatedAmount: number; // Monto asignado a esta venta
}

// DTO principal para el pago
export class CreatePaymentDto {
  @IsNumber()
  @Min(0)
  amount: number; // Monto total del pago

  @IsEnum(PaymentType)
  paymentType: PaymentType; // Tipo de pago (CASH, CREDIT, etc.)

  @IsDateString()
  @IsOptional()
  paymentDate?: Date; // Fecha del pago (opcional, por defecto se usa la fecha actual)

  @IsString()
  @IsOptional()
  notes?: string; // Notas opcionales

  @IsArray()
  @ValidateNested({ each: true })
  allocations: PaymentAllocationDto[]; // Lista de asignaciones a ventas
}
