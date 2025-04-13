import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePostTitle1744571258132 implements MigrationInterface {
  name = 'RemovePostTitle1744571258132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" ADD "title" text NOT NULL`);
  }
}
