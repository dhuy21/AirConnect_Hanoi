import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Rating } from './rating.entity';
import { PostType } from '../common/enums';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  image: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  published_at: Date;

  @Column()
  school_id: number;

  @ManyToOne(() => School, (school) => school.posts)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => Rating, (rating) => rating.post)
  ratings: Rating[];
}
