import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialRecord } from './entities/financialRecords.entity';
import { User } from '../users/entities/user.entity';
import { FinancialRecordsService } from './financialRecords.service';
import { FinancialRecordsController } from './financialRecords.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialRecord, User])],
  controllers: [FinancialRecordsController],
  providers: [FinancialRecordsService],
  exports: [TypeOrmModule],
})
export class FinancialRecordsModule {}
