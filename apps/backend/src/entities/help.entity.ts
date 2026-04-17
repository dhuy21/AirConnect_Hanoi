import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { School } from './school.entity';
import { HelpType, HelpStatus } from '../common/enums';

@Entity('helps')
export class Help {
  @PrimaryColumn()
  from_school_id: number;

  @PrimaryColumn()
  to_school_id: number;

  @Column({ type: 'enum', enum: HelpType })
  type: HelpType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: HelpStatus })
  status: HelpStatus;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => School, (school) => school.helps_from)
  @JoinColumn({ name: 'from_school_id' })
  from_school: School;

  @ManyToOne(() => School, (school) => school.helps_to)
  @JoinColumn({ name: 'to_school_id' })
  to_school: School;
}
