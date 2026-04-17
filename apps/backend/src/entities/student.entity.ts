import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Rating } from './rating.entity';
import { Sex } from '../common/enums';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ type: 'enum', enum: Sex })
  sex: Sex;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 255 })
  health_status: string;

  @Column({ length: 255, select: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  school_id: number;

  @ManyToOne(() => School, (school) => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => Rating, (rating) => rating.student)
  ratings: Rating[];
}
