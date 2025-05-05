import { MigrationInterface, QueryRunner } from 'typeorm';

export class Categories1746462773852 implements MigrationInterface {
  name = 'Categories1746462773852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_posts_posts" ("categoriesId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "PK_33d61de34a51ddbc8748946588a" PRIMARY KEY ("categoriesId", "postsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e24774f82f518838b1acbe7add" ON "categories_posts_posts" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a6e72a6e55b4cabe31d04975b" ON "categories_posts_posts" ("postsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" ADD CONSTRAINT "FK_e24774f82f518838b1acbe7addb" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" ADD CONSTRAINT "FK_8a6e72a6e55b4cabe31d04975b4" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" DROP CONSTRAINT "FK_8a6e72a6e55b4cabe31d04975b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" DROP CONSTRAINT "FK_e24774f82f518838b1acbe7addb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a6e72a6e55b4cabe31d04975b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e24774f82f518838b1acbe7add"`,
    );
    await queryRunner.query(`DROP TABLE "categories_posts_posts"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
