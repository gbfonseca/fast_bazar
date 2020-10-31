import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1603938526257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'address_street',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'address_number',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'address_city',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'address_zip_code',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'address_state',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'address_complement',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
