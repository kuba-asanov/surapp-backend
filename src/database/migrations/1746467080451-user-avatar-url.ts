import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAvatarUrl1746467080451 implements MigrationInterface {
  name = 'UserAvatarUrl1746467080451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar_url" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_url"`);
  }
}
