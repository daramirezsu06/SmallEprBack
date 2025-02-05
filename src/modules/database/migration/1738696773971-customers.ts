import { MigrationInterface, QueryRunner } from "typeorm";

export class Customers1738696773971 implements MigrationInterface {
    name = 'Customers1738696773971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "tel"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "tel" character varying(30)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "tel"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "tel" character varying(15)`);
    }

}
