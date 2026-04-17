import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { Solution } from '../../entities/solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solution])],
  controllers: [SolutionController],
  providers: [SolutionService],
  exports: [SolutionService],
})
export class SolutionModule {}
