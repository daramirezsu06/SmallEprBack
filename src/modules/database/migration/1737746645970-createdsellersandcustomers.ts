import { MigrationInterface, QueryRunner } from "typeorm";

export class Createdsellersandcustomers1737746645970 implements MigrationInterface {
    name = 'Createdsellersandcustomers1737746645970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_Customer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_e7128ac69ae28cec53d361a4266" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "lat" double precision, "lon" double precision, "nit" character varying(50), "tel" character varying(15), "typeCustomerId" integer NOT NULL, "sellerId" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_customer" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "customer_id" integer NOT NULL, CONSTRAINT "REL_ce0cae26abff6b3eabb6efc036" UNIQUE ("user_id"), CONSTRAINT "REL_bb0c3d7313eb5f15c6354a222d" UNIQUE ("customer_id"), CONSTRAINT "PK_8b95510e98ebfc692bfc64125c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sellers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "cedula" character varying(20), "user_id" integer, "type_seller_id" integer NOT NULL, CONSTRAINT "REL_83f4670f0e114d0be3731bade8" UNIQUE ("user_id"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_seller" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_2c54f0f187481faeb698f854c2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_6738df0169e40e51f6d65d8cf90" FOREIGN KEY ("typeCustomerId") REFERENCES "type_Customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_4f9f30265c943b0a3533b5b5a2f" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" ADD CONSTRAINT "FK_ce0cae26abff6b3eabb6efc036b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" ADD CONSTRAINT "FK_bb0c3d7313eb5f15c6354a222db" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_83f4670f0e114d0be3731bade87" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_a7237e71ef3a9e034d01e0899a1" FOREIGN KEY ("type_seller_id") REFERENCES "type_seller"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_a7237e71ef3a9e034d01e0899a1"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_83f4670f0e114d0be3731bade87"`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" DROP CONSTRAINT "FK_bb0c3d7313eb5f15c6354a222db"`);
        await queryRunner.query(`ALTER TABLE "usuario_customer" DROP CONSTRAINT "FK_ce0cae26abff6b3eabb6efc036b"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_4f9f30265c943b0a3533b5b5a2f"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_6738df0169e40e51f6d65d8cf90"`);
        await queryRunner.query(`DROP TABLE "type_seller"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TABLE "usuario_customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "type_Customer"`);
    }

}
