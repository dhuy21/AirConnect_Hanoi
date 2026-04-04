import {
  Entity, Column, ManyToOne, JoinColumn, PrimaryColumn,
} from 'typeorm';
import { Submission } from './submission.entity';
import { Admin } from './admin.entity';
import { ReviewDecision } from '../common/enums';

@Entity('reviews')
export class Review {
  @PrimaryColumn()
  submission_id: number;

  @PrimaryColumn()
  admin_id: number;

  @Column({ type: 'enum', enum: ReviewDecision })
  decision: ReviewDecision;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @ManyToOne(() => Admin, (admin) => admin.reviews)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(() => Submission, (sub) => sub.reviews)
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;
}
