import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Review } from './review.entity';
import { SubmissionType } from '../common/enums';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SubmissionType })
  type: SubmissionType;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  from_school_id: number;

  @ManyToOne(() => School, (school) => school.submissions)
  @JoinColumn({ name: 'from_school_id' })
  school: School;

  @OneToMany(() => Review, (review) => review.submission)
  reviews: Review[];
}
