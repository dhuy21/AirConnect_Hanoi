import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from './review.entity';
import { AdminType } from '../common/enums';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AdminType })
  type: AdminType;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 255, unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Review, (review) => review.admin)
  reviews: Review[];
}
