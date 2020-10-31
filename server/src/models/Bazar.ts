import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('bazars')
export class Bazar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address_street: string;

  @Column()
  address_number: string;

  @Column()
  address_state: string;

  @Column()
  address_city: string;

  @Column()
  address_zip_code: string;

  @Column()
  address_complement: string;

  @Column()
  phone: string;

  @Column()
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
