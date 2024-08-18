import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1723658510162 implements MigrationInterface {
  name = 'UsersTable1723658510162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" text, "username" text NOT NULL, "name" text NOT NULL DEFAULT '', "surname" text NOT NULL DEFAULT '', "phone" text, "password" text NOT NULL, "bio" text NOT NULL DEFAULT '', "onboarded" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT '0', "device_id" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
