import { MigrationInterface, QueryRunner } from "typeorm";

export class Bills1743199363302 implements MigrationInterface {
    name = 'Bills1743199363302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sell" ADD "bill" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sell" DROP COLUMN "bill"`);
    }

}
