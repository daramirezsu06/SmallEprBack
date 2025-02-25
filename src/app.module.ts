import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SellerModule } from './modules/seller/seller.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoriesModule } from './modules/inventories/inventories.module';
import { FormulationsModule } from './modules/formulations/formulations.module';
import { ProductionOrdersModule } from './modules/production-orders/production-orders.module';
import { ProductionsModule } from './modules/productions/productions.module';
import { PreloadDataModule } from './modules/preload-data/preload-data.module';
import { PreloadDataService } from './modules/preload-data/preload-data.service';
import { SellsModule } from './modules/sells/sells.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { AuthModule } from './modules/auth/auth.module';

console.log(config());

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    UserModule,
    CustomerModule,
    SellerModule,
    DatabaseModule,
    ProductsModule,
    InventoriesModule,
    FormulationsModule,
    ProductionOrdersModule,
    ProductionsModule,
    PreloadDataModule,
    SellsModule,
    PurchasesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly preloadDataService: PreloadDataService) {}
  async onModuleInit() {
    await console.log('la precarga de datos esta comentada');
  }

  // async onModuleInit() {
  //   await this.preloadDataService.preloadData();
  // }
}
