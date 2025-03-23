import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, PaymentType } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentSell } from './entities/payment_sell.entity';
import { Sell } from '../sells/entities/sell.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentSell)
    private readonly paymentSellRepository: Repository<PaymentSell>,
    @InjectRepository(Sell)
    private readonly sellRepository: Repository<Sell>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const { paymentType, amount, paymentDate, notes, allocations } =
      createPaymentDto;
    const queryRunner =
      this.paymentRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const payment = new Payment();
      payment.amount = amount;
      payment.paymentType = paymentType;
      payment.paymentDate = paymentDate;
      payment.notes = notes;
      await queryRunner.manager.save(Payment, payment);

      for (const allocation of allocations) {
        const paymentSell = new PaymentSell();
        paymentSell.payment = payment;
        paymentSell.sell = await this.sellRepository.findOne({
          where: { id: allocation.sellId },
        });
        paymentSell.allocatedAmount = allocation.allocatedAmount;
        await queryRunner.manager.save(PaymentSell, paymentSell);
      }
      await queryRunner.commitTransaction();
      return await this.findOne(payment.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.paymentRepository.find({ relations: ['paymentSells'] });
  }

  findOne(id: number) {
    return this.paymentRepository.findOne({
      where: { id: id },
      relations: ['paymentSells'],
    });
  }

  async paymentAllBeforeDate() {
    const sells = await this.sellRepository.find({
      relations: ['paymentSells'],
    });

    for (const sell of sells) {
      if (
        sell.paymentSells.reduce((sum, ps) => sum + ps.allocatedAmount, 0) == 0
      ) {
        const payment = new Payment();
        payment.amount = sell.totalPrice;
        payment.paymentType = PaymentType.CASH;
        payment.paymentDate = new Date();
        payment.notes = 'Pago de venta pasada por inicio de app';
        await this.paymentRepository.save(payment);
        const paymentSells = new PaymentSell();
        paymentSells.payment = payment;
        paymentSells.sell = sell;
        paymentSells.allocatedAmount = sell.totalPrice;
        await this.paymentSellRepository.save(paymentSells);
      }
    }
  }
}
