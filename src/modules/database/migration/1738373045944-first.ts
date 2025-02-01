import { MigrationInterface, QueryRunner } from "typeorm";

export class First1738373045944 implements MigrationInterface {
    name = 'First1738373045944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_Customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_e7128ac69ae28cec53d361a4266" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_seller" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_2c54f0f187481faeb698f854c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sellers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "cedula" character varying(20), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "user_id" integer, "type_seller_id" integer NOT NULL, CONSTRAINT "REL_83f4670f0e114d0be3731bade8" UNIQUE ("user_id"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "acronyms" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sub_Type_Product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "acronyms" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "typeProductId" integer, CONSTRAINT "PK_82c1362efde60f65d6e513a0c49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Type_Product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "acronyms" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_22328167bc2ba76becd2400040e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movement_Type" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_5fa218ae5092efb525344529d4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Formulations_Items" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, "formulationsId" integer, CONSTRAINT "PK_cdaead292ff2fb24ebb493afd96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "formulation" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "cuantity" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, CONSTRAINT "PK_9a55aff86d4f8432667160f697f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Production_Order_Items" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, "formulationsId" integer, CONSTRAINT "PK_73e0ec1f82dab382d3f3d828d05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production-order" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "pending" boolean NOT NULL DEFAULT true, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, "formulationsId" integer, CONSTRAINT "PK_82696377ca48f92ba0d81657f12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Production_items" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "cost" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, "productionId" integer, CONSTRAINT "PK_e6a1a062f6bd43d440ba4e417b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "production" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "cost" numeric NOT NULL, "totalCost" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "productId" integer, "production_order_id" integer, CONSTRAINT "REL_f54cdfe8185f9a911aaaa66f54" UNIQUE ("production_order_id"), CONSTRAINT "PK_722753196a878fa7473f0381da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory_movements" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "cost" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "movementTypeId" integer, "productId" integer, CONSTRAINT "PK_d7597827c1dcffae889db3ab873" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "cost" numeric NOT NULL, "quantity" numeric NOT NULL, "product_id" integer, CONSTRAINT "REL_732fdb1f76432d65d2c136340d" UNIQUE ("product_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "unitId" integer, "typeProductId" integer, "subTypeProductId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_list_item" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "priceListId" integer, "productId" integer, CONSTRAINT "PK_7a27d83fb313aec9cd2702805d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price_list" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_52ea7826468b1c889cb2c28df03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "lat" double precision, "lon" double precision, "nit" character varying(50), "tel" character varying(15), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "typeCustomerId" integer NOT NULL, "sellerId" integer, "priceListId" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_customer" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "user_id" integer NOT NULL, "customer_id" integer NOT NULL, CONSTRAINT "REL_ce0cae26abff6b3eabb6efc036" UNIQUE ("user_id"), CONSTRAINT "REL_bb0c3d7313eb5f15c6354a222d" UNIQUE ("customer_id"), CONSTRAINT "PK_8b95510e98ebfc692bfc64125c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "roleId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_83f4670f0e114d0be3731bade87" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_a7237e71ef3a9e034d01e0899a1" FOREIGN KEY ("type_seller_id") REFERENCES "type_seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sub_Type_Product" ADD CONSTRAINT "FK_16e1e2a55967744db76a8c643c3" FOREIGN KEY ("typeProductId") REFERENCES "Type_Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Formulations_Items" ADD CONSTRAINT "FK_d64b7ae58080ebbf1b4bc747988" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Formulations_Items" ADD CONSTRAINT "FK_b526f7ff7c7ebd3fda8ebcfdc69" FOREIGN KEY ("formulationsId") REFERENCES "formulation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "formulation" ADD CONSTRAINT "FK_9887a4acd4171fbe86a410e32d9" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Production_Order_Items" ADD CONSTRAINT "FK_8186119ac01d26705da6bf4219d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Production_Order_Items" ADD CONSTRAINT "FK_a973f91b8b5de9b372b2938b916" FOREIGN KEY ("formulationsId") REFERENCES "production-order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production-order" ADD CONSTRAINT "FK_85555649fa761af73292f0a355e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production-order" ADD CONSTRAINT "FK_ece2515604ad6130d3c7dfeca4f" FOREIGN KEY ("formulationsId") REFERENCES "formulation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Production_items" ADD CONSTRAINT "FK_8556b110fc71828d4ed37caf117" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Production_items" ADD CONSTRAINT "FK_f75aab05d3fb5d6c9988ed79e60" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production" ADD CONSTRAINT "FK_b35661d616ddf07e8cede98a959" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "production" ADD CONSTRAINT "FK_f54cdfe8185f9a911aaaa66f546" FOREIGN KEY ("production_order_id") REFERENCES "production-order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD CONSTRAINT "FK_347c20c3de8eda3950901b71081" FOREIGN KEY ("movementTypeId") REFERENCES "movement_Type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD CONSTRAINT "FK_05715a7ea47e49653f164c0dd8c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2ee96d5eff55f14a6e37470b782" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d304079ecdc3c8f3d0389c99270" FOREIGN KEY ("typeProductId") REFERENCES "Type_Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7acfde22e96e2348d3323b500" FOREIGN KEY ("subTypeProductId") REFERENCES "Sub_Type_Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_list_item" ADD CONSTRAINT "FK_98676c96bd6e657c24edbfc74d0" FOREIGN KEY ("priceListId") REFERENCES "price_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_list_item" ADD CONSTRAINT "FK_b3865135b26cc2ff523ed212155" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_6738df0169e40e51f6d65d8cf90" FOREIGN KEY ("typeCustomerId") REFERENCES "type_Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4f9f30265c943b0a3533b5b5a2f" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3c02d698a68ccc2074cf22f6f44" FOREIGN KEY ("priceListId") REFERENCES "price_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" ADD CONSTRAINT "FK_ce0cae26abff6b3eabb6efc036b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" ADD CONSTRAINT "FK_bb0c3d7313eb5f15c6354a222db" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" DROP CONSTRAINT "FK_bb0c3d7313eb5f15c6354a222db"`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" DROP CONSTRAINT "FK_ce0cae26abff6b3eabb6efc036b"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3c02d698a68ccc2074cf22f6f44"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4f9f30265c943b0a3533b5b5a2f"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_6738df0169e40e51f6d65d8cf90"`);
        await queryRunner.query(`ALTER TABLE "price_list_item" DROP CONSTRAINT "FK_b3865135b26cc2ff523ed212155"`);
        await queryRunner.query(`ALTER TABLE "price_list_item" DROP CONSTRAINT "FK_98676c96bd6e657c24edbfc74d0"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7acfde22e96e2348d3323b500"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d304079ecdc3c8f3d0389c99270"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2ee96d5eff55f14a6e37470b782"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP CONSTRAINT "FK_05715a7ea47e49653f164c0dd8c"`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP CONSTRAINT "FK_347c20c3de8eda3950901b71081"`);
        await queryRunner.query(`ALTER TABLE "production" DROP CONSTRAINT "FK_f54cdfe8185f9a911aaaa66f546"`);
        await queryRunner.query(`ALTER TABLE "production" DROP CONSTRAINT "FK_b35661d616ddf07e8cede98a959"`);
        await queryRunner.query(`ALTER TABLE "Production_items" DROP CONSTRAINT "FK_f75aab05d3fb5d6c9988ed79e60"`);
        await queryRunner.query(`ALTER TABLE "Production_items" DROP CONSTRAINT "FK_8556b110fc71828d4ed37caf117"`);
        await queryRunner.query(`ALTER TABLE "production-order" DROP CONSTRAINT "FK_ece2515604ad6130d3c7dfeca4f"`);
        await queryRunner.query(`ALTER TABLE "production-order" DROP CONSTRAINT "FK_85555649fa761af73292f0a355e"`);
        await queryRunner.query(`ALTER TABLE "Production_Order_Items" DROP CONSTRAINT "FK_a973f91b8b5de9b372b2938b916"`);
        await queryRunner.query(`ALTER TABLE "Production_Order_Items" DROP CONSTRAINT "FK_8186119ac01d26705da6bf4219d"`);
        await queryRunner.query(`ALTER TABLE "formulation" DROP CONSTRAINT "FK_9887a4acd4171fbe86a410e32d9"`);
        await queryRunner.query(`ALTER TABLE "Formulations_Items" DROP CONSTRAINT "FK_b526f7ff7c7ebd3fda8ebcfdc69"`);
        await queryRunner.query(`ALTER TABLE "Formulations_Items" DROP CONSTRAINT "FK_d64b7ae58080ebbf1b4bc747988"`);
        await queryRunner.query(`ALTER TABLE "Sub_Type_Product" DROP CONSTRAINT "FK_16e1e2a55967744db76a8c643c3"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_a7237e71ef3a9e034d01e0899a1"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_83f4670f0e114d0be3731bade87"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "usuario_customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "price_list"`);
        await queryRunner.query(`DROP TABLE "price_list_item"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "inventory_movements"`);
        await queryRunner.query(`DROP TABLE "production"`);
        await queryRunner.query(`DROP TABLE "Production_items"`);
        await queryRunner.query(`DROP TABLE "production-order"`);
        await queryRunner.query(`DROP TABLE "Production_Order_Items"`);
        await queryRunner.query(`DROP TABLE "formulation"`);
        await queryRunner.query(`DROP TABLE "Formulations_Items"`);
        await queryRunner.query(`DROP TABLE "movement_Type"`);
        await queryRunner.query(`DROP TABLE "Type_Product"`);
        await queryRunner.query(`DROP TABLE "Sub_Type_Product"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TABLE "type_seller"`);
        await queryRunner.query(`DROP TABLE "type_Customer"`);
    }

}
