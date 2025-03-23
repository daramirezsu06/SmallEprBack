import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletePeydcolumm1742748105451 implements MigrationInterface {
    name = 'DeletePeydcolumm1742748105451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sell" DROP COLUMN "paid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sell" ADD "paid" boolean NOT NULL DEFAULT false`);
    }

}
