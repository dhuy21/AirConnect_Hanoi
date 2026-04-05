import {
  Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Student } from './student.entity';
import { RateStar } from '../common/enums';

@Entity('ratings')
export class Rating {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  student_id: number;

  @Column({ type: 'enum', enum: RateStar })
  rate: RateStar;

  @CreateDateColumn()
  rated_at: Date;

  @ManyToOne(() => Post, (post) => post.ratings)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Student, (student) => student.ratings)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
