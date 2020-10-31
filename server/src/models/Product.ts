import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Bazar } from './Bazar';
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column('decimal', {precision: 6, scale: 2})
  price: number;

  @Column()
  bazar_id: string

  @ManyToOne(() => Bazar)
  @JoinColumn({ name: 'bazar_id' })
  bazar: Bazar;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
