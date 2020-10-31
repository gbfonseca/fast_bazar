import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateBazar1604092207399 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable( new Table({
			name: 'bazars',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()'
				},
				{
					name: 'name',
					type: 'varchar'
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
					name: 'phone',
					type: 'varchar'
				},
				{
					name: 'user_id',
					type: 'uuid',
					isNullable: true
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
			]
		 }));

		await queryRunner.createForeignKey('bazars', new TableForeignKey({
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'users',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		// await queryRunner.dropForeignKey('bazars', 'user_id');
		await queryRunner.dropTable('bazars');
  }

}
