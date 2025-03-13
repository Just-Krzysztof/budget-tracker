import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { FinancialRecord } from '../financialRecords/entities/financialRecords.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialRecord, User])],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
