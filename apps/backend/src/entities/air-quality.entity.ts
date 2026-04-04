import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { School } from './school.entity';
import { Apply } from './apply.entity';

@Entity('air_qualities')
export class AirQuality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  aqi: number;

  @Column({ type: 'float', nullable: true })
  pm25: number;

  @Column({ type: 'float', nullable: true })
  pm10: number;

  @Column({ type: 'float', nullable: true })
  co2: number;

  @Column({ type: 'float', nullable: true })
  temp: number;

  @Column({ type: 'float', nullable: true })
  humidity: number;

  @Column({ type: 'float', nullable: true })
  wind_speed: number;

  @CreateDateColumn()
  measured_at: Date;

  @Column()
  school_id: number;

  @ManyToOne(() => School, (school) => school.air_qualities)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @OneToMany(() => Apply, (apply) => apply.air_quality)
  applies: Apply[];
}
