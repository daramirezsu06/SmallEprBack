import { MigrationInterface, QueryRunner } from "typeorm";

export class MunicipalitiesAndNeiborhood1740528439745 implements MigrationInterface {
    name = 'MunicipalitiesAndNeiborhood1740528439745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "municipality" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lat" double precision, "lon" double precision, CONSTRAINT "PK_281ad341f20df7c41b83a182e2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "neighborhood" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lat" double precision, "lon" double precision, "municipalityId" integer, CONSTRAINT "PK_97797961be30242a5170d17caec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "neighborhoodId" integer`);
        await queryRunner.query(`ALTER TABLE "neighborhood" ADD CONSTRAINT "FK_9b624642a03ed9676583b412b17" FOREIGN KEY ("municipalityId") REFERENCES "municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_0509c9672357ae979fd07ea6906" FOREIGN KEY ("neighborhoodId") REFERENCES "neighborhood"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_0509c9672357ae979fd07ea6906"`);
        await queryRunner.query(`ALTER TABLE "neighborhood" DROP CONSTRAINT "FK_9b624642a03ed9676583b412b17"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "neighborhoodId"`);
        await queryRunner.query(`DROP TABLE "neighborhood"`);
        await queryRunner.query(`DROP TABLE "municipality"`);
    }

}
