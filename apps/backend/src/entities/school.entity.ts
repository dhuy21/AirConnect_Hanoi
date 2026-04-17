import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Student } from './student.entity';
import { Submission } from './submission.entity';
import { Post } from './post.entity';
import { AirQuality } from './air-quality.entity';
import { Help } from './help.entity';
import { SchoolType } from '../common/enums';
import type { GeoPoint } from '../common/interfaces/geo-point.interface';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SchoolType })
  type: SchoolType;

  @Column({ length: 255 })
  name: string;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: GeoPoint;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 255, nullable: true })
  district: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 255, nullable: true })
  situation: string;

  @Column({ length: 255, nullable: true, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'float', default: 0 })
  score_1: number;

  @Column({ type: 'float', default: 0 })
  score_2: number;

  @Column({ type: 'float', default: 0 })
  score_3: number;

  @Column({ type: 'float', default: 0 })
  score_4: number;

  @Column({ type: 'float', default: 0 })
  score_5: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Student, (student) => student.school, { cascade: true })
  students: Student[];

  @OneToMany(() => Submission, (sub) => sub.school, { cascade: true })
  submissions: Submission[];

  @OneToMany(() => Post, (post) => post.school, { cascade: true })
  posts: Post[];

  @OneToMany(() => AirQuality, (aq) => aq.school, { cascade: true })
  air_qualities: AirQuality[];

  @OneToMany(() => Help, (h) => h.from_school)
  helps_from: Help[];

  @OneToMany(() => Help, (h) => h.to_school)
  helps_to: Help[];
}
