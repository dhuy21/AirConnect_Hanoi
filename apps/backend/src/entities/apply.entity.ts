import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { Solution } from './solution.entity';
import { AirQuality } from './air-quality.entity';

@Entity('applies')
export class Apply {
  @PrimaryColumn()
  solution_id: number;

  @PrimaryColumn()
  air_quality_id: number;

  @CreateDateColumn()
  applied_at: Date;

  @ManyToOne(() => Solution, (sol) => sol.applies)
  @JoinColumn({ name: 'solution_id' })
  solution: Solution;

  @ManyToOne(() => AirQuality, (aq) => aq.applies)
  @JoinColumn({ name: 'air_quality_id' })
  air_quality: AirQuality;
}
