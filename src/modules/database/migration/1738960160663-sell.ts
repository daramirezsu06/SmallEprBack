import { MigrationInterface, QueryRunner } from "typeorm";

export class Sell1738960160663 implements MigrationInterface {
    name = 'Sell1738960160663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sell_items" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "cost" numeric, "price" numeric, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "sellId" integer, "productId" integer, "inventoryMovementsId" integer, CONSTRAINT "REL_3f1c94d30d3f19d3466293f072" UNIQUE ("inventoryMovementsId"), CONSTRAINT "PK_da513f24266f7e749a78b0f61d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sell" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "totalCost" numeric NOT NULL, "totalPrice" numeric NOT NULL, "paid" boolean NOT NULL DEFAULT false, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "customerId" integer, "sellerId" integer, CONSTRAINT "PK_8cc9d759945a4176103696feedf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sell_items" ADD CONSTRAINT "FK_081036f2ef816ae2a30f86fe59a" FOREIGN KEY ("sellId") REFERENCES "sell"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sell_items" ADD CONSTRAINT "FK_f21cbe10b101235af5c4e98c4bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sell_items" ADD CONSTRAINT "FK_3f1c94d30d3f19d3466293f0726" FOREIGN KEY ("inventoryMovementsId") REFERENCES "inventory_movements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sell" ADD CONSTRAINT "FK_2559781231b68538b10587d548f" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sell" ADD CONSTRAINT "FK_e9352259ce5dbb413b74c29ff12" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sell" DROP CONSTRAINT "FK_e9352259ce5dbb413b74c29ff12"`);
        await queryRunner.query(`ALTER TABLE "sell" DROP CONSTRAINT "FK_2559781231b68538b10587d548f"`);
        await queryRunner.query(`ALTER TABLE "sell_items" DROP CONSTRAINT "FK_3f1c94d30d3f19d3466293f0726"`);
        await queryRunner.query(`ALTER TABLE "sell_items" DROP CONSTRAINT "FK_f21cbe10b101235af5c4e98c4bf"`);
        await queryRunner.query(`ALTER TABLE "sell_items" DROP CONSTRAINT "FK_081036f2ef816ae2a30f86fe59a"`);
        await queryRunner.query(`DROP TABLE "sell"`);
        await queryRunner.query(`DROP TABLE "sell_items"`);
    }

}
