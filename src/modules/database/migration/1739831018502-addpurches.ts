import { MigrationInterface, QueryRunner } from "typeorm";

export class Addpurches1739831018502 implements MigrationInterface {
    name = 'Addpurches1739831018502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "NIT" double precision, "tel" character varying(30), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "Factura" numeric NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP, "supplierId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD "purchaseId" integer`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_b4ee84e23fdff57bb8bfefbf998" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD CONSTRAINT "FK_d7b689003e517e6d9f0f1b3aae7" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP CONSTRAINT "FK_d7b689003e517e6d9f0f1b3aae7"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_b4ee84e23fdff57bb8bfefbf998"`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP COLUMN "purchaseId"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
    }

}
