import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProducts1604101034346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table ({
				name: 'products',
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
						name: 'description',
						type: 'varchar'
					},
					{
						name: 'quantity',
						type: 'integer'
					},
					{
						name: 'price',
						type: 'numeric',
						precision: 6,
						scale: 2
					},
					{
						name: 'bazar_id',
						type: 'uuid'
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

			await queryRunner.createForeignKey('products', new TableForeignKey({
				columnNames: ['bazar_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'bazars',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			}));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			// await queryRunner.dropForeignKey('products', 'bazar_id');
			await queryRunner.dropTable('products');
    }

}
