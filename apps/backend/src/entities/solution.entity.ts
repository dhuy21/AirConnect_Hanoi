import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Apply } from './apply.entity';
import { SolutionType, SolutionStatus } from '../common/enums';

@Entity('solutions')
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SolutionType })
  type: SolutionType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'enum', enum: SolutionStatus })
  status: SolutionStatus;

  @OneToMany(() => Apply, (apply) => apply.solution)
  applies: Apply[];
}
