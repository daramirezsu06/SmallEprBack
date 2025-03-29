import { Injectable } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sell } from './entities/sell.entity';
import { Repository } from 'typeorm';
import { SellItems } from './entities/sell_items.entity';
import { Product } from '../products/entities/product.entity';
import { Seller } from '../seller/entities/seller.entity';
import { InventoryMovements } from '../inventories/entities/inventory_movements.entity';
import { Inventory } from '../inventories/entities/inventory.entity';
import { Customer } from '../customer/entities/customer.entity';
import { MovementType } from '../inventories/entities/movement_Type.entity';
import { SellResponseDto, SellStatus } from './dto/sell-response.dto';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentSell } from '../payments/entities/payment_sell.entity';
import { PaymentType } from '../payments/dto/create-payment.dto';

// function calculateSellStatus(sell: Sell): SellStatus {
//   const totalPaid =
//     sell.paymentSells?.reduce(
//       (sum, ps) => sum + Number(ps.allocatedAmount),
//       0,
//     ) || 0;
//   if (totalPaid >= Number(sell.totalPrice)) {
//     return SellStatus.PAID;
//   }
//   if (totalPaid > 0) {
//     return SellStatus.PARTIALLY_PAID;
//   }
//   return SellStatus.PENDING;
// }

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(Sell) private sellRepository: Repository<Sell>,
    @InjectRepository(SellItems)
    private sellItemsRepository: Repository<SellItems>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
    @InjectRepository(InventoryMovements)
    private inventoryMovementsRepository: Repository<InventoryMovements>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(MovementType)
    private movementTypeRepository: Repository<MovementType>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentSell)
    private paymentSellRepository: Repository<PaymentSell>,
  ) {}
  async create(createSellDto: CreateSellDto) {
    const { customerId, sellItems, type, bill } = createSellDto;
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['seller'],
    });
    const seller = customer.seller;

    const queryRunner =
      this.sellRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const sell = new Sell();
      sell.seller = seller;
      sell.customer = customer;
      sell.quantity = 0;
      sell.totalCost = 0;
      sell.totalPrice = 0;

      await queryRunner.manager.save(Sell, sell);
      console.log('sell', sell);

      let totalCost = 0;
      let totalPrice = 0;
      let totalQuantity = 0;

      for (const sellItem of sellItems) {
        const product = await this.productRepository.findOne({
          where: { id: sellItem.productId },
        });
        console.log('product', product);

        const inventory = await this.inventoryRepository.findOne({
          where: { product: { id: product.id } },
          relations: ['product'],
        });
        console.log('inventory', inventory);

        if (!inventory || inventory.quantity < sellItem.quantity) {
          throw new Error(`Insufficient inventory for product ${product.id}`);
        }

        const inventoryMovements = new InventoryMovements();
        inventoryMovements.quantity = -sellItem.quantity;
        inventoryMovements.cost = inventory.cost;
        inventoryMovements.product = product;
        inventoryMovements.movementType =
          await this.movementTypeRepository.findOne({
            where: { id: 5 },
          });
        await queryRunner.manager.save(InventoryMovements, inventoryMovements);

        const sellItemEntity = new SellItems();
        sellItemEntity.sell = sell;
        sellItemEntity.product = product;
        sellItemEntity.quantity = sellItem.quantity;
        sellItemEntity.cost = inventory.cost;
        sellItemEntity.price = sellItem.price;
        sellItemEntity.inventoryMovements = inventoryMovements;

        totalCost += inventory.cost * sellItem.quantity;
        totalPrice += sellItem.price * sellItem.quantity; // Corrección clave aquí
        totalQuantity += sellItem.quantity;

        inventory.quantity -= sellItem.quantity;
        await queryRunner.manager.save(Inventory, inventory);

        await queryRunner.manager.save(SellItems, sellItemEntity);
      }

      sell.quantity = totalQuantity;
      sell.totalCost = totalCost;
      sell.totalPrice = totalPrice;

      if (bill) {
        sell.bill = bill;
      }

      await queryRunner.manager.save(Sell, sell);

      if (type === 'CASH') {
        const payment = new Payment();
        payment.amount = sell.totalPrice;
        payment.paymentType = PaymentType.CASH;
        payment.paymentDate = new Date();
        payment.notes = 'resgistro automatico de pago por venta de contado';
        await queryRunner.manager.save(Payment, payment);
        const paymentSells = new PaymentSell();
        paymentSells.payment = payment;
        paymentSells.sell = sell;
        paymentSells.allocatedAmount = sell.totalPrice;
        await queryRunner.manager.save(PaymentSell, paymentSells);
      }

      await queryRunner.commitTransaction();
      return await this.findOne(sell.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  async findAll() {
    return await this.sellRepository.find({
      relations: ['seller', 'customer', 'sellItems', 'paymentSells'],
    });
  }

  async findOne(id: number) {
    return await this.sellRepository.findOne({
      where: { id: id },
      relations: [
        'seller',
        'customer',
        'sellItems',
        'sellItems.product',
        'paymentSells',
      ],
    });
  }

  async findByCustomer(customerId: number): Promise<SellResponseDto[]> {
    const sells = await this.sellRepository.find({
      where: { customer: { id: customerId } },
      relations: ['paymentSells'],
    });

    const sellsWithStatus = sells.map((sell) => {
      const totalPaid =
        sell.paymentSells?.reduce(
          (sum, ps) => sum + Number(ps.allocatedAmount),
          0,
        ) || 0;
      const pendingAmount = Number(sell.totalPrice) - totalPaid;
      let status: SellStatus;

      if (totalPaid >= Number(sell.totalPrice)) {
        status = SellStatus.PAID;
      } else if (totalPaid > 0) {
        status = SellStatus.PARTIALLY_PAID;
      } else {
        status = SellStatus.PENDING;
      }

      return {
        ...sell,
        status,
        pendingAmount: pendingAmount > 0 ? pendingAmount : 0, // Saldo pendiente
      };
    });

    return sellsWithStatus;
  }
  async findByCustomerPending(customerId: number): Promise<SellResponseDto[]> {
    const sellsWithStatus = await this.findByCustomer(customerId);
    console.log(sellsWithStatus);

    return sellsWithStatus.filter((sell) => sell.status !== SellStatus.PAID);
  }

  async findAllPending() {
    const sells = await this.sellRepository.find({
      relations: ['paymentSells', 'customer'],
    });
    console.log(sells);

    const sellsWithStatus = sells.map((sell) => {
      const totalPaid =
        sell.paymentSells?.reduce(
          (sum, ps) => sum + Number(ps.allocatedAmount),
          0,
        ) || 0;
      const pendingAmount = Number(sell.totalPrice) - totalPaid;
      let status: SellStatus;

      if (totalPaid >= Number(sell.totalPrice)) {
        status = SellStatus.PAID;
      } else if (totalPaid > 0) {
        status = SellStatus.PARTIALLY_PAID;
      } else {
        status = SellStatus.PENDING;
      }

      return {
        ...sell,
        status,
        pendingAmount: pendingAmount > 0 ? pendingAmount : 0, // Saldo pendiente
      };
    });

    const totalPending = sellsWithStatus.reduce(
      (sum, sell) => sum + sell.pendingAmount,
      0,
    );

    const pendingList = sellsWithStatus.filter(
      (sell) => sell.status !== SellStatus.PAID,
    );

    return {
      totalPending,
      pendingList,
    };
  }
}
