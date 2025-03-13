import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FinancialRecord } from '../financialRecords/entities/financialRecords.entity';
import { RecordType } from '../financialRecords/enums/record-type.enum';
import { SummaryResponseDto } from './dto/summary-response.dto';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(FinancialRecord)
    private financialRecordRepository: Repository<FinancialRecord>,
  ) {}

  async getMonthlySummary(
    userId: string,
    year: number,
    month: number,
  ): Promise<SummaryResponseDto> {
    const startDate = new Date(year, month - 1, 1); // Months in JS are 0-indexed
    console.log('startDate', startDate);

    const endDate = new Date(year, month, 0); // Last day of the month
    endDate.setHours(23, 59, 59, 999);
    console.log('endDate', endDate);

    // Get all financial records of the user for the given month
    const records = await this.financialRecordRepository.find({
      where: {
        user: { id: userId },
        createdAt: Between(startDate, endDate),
      },
      relations: ['user'],
    });
    console.log('records', records);

    // Calculate the sum of income and expenses
    const totalIncome = records
      .filter((record) => record.type === RecordType.INCOME)
      .reduce((sum, record) => sum + Number(record.value), 0);

    const totalExpenses = records
      .filter((record) => record.type === RecordType.EXPENSE)
      .reduce((sum, record) => sum + Number(record.value), 0);

    // Calculate savings (income - expenses)
    const totalSaved = totalIncome - totalExpenses;

    // Format the month name
    const monthName = new Date(year, month - 1).toLocaleString('pl-PL', {
      month: 'long',
    });

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      period: `${monthName} ${year}`,
    };
  }

  async getYearlySummary(
    userId: string,
    year: number,
  ): Promise<SummaryResponseDto> {
    // Create date range for the selected year
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // December 31st, 23:59:59.999

    // Get all financial records of the user for the given year
    const records = await this.financialRecordRepository.find({
      where: {
        user: { id: userId },
        createdAt: Between(startDate, endDate),
      },
      relations: ['user'],
    });

    // Calculate the sum of income and expenses
    const totalIncome = records
      .filter((record) => record.type === RecordType.INCOME)
      .reduce((sum, record) => sum + Number(record.value), 0);

    const totalExpenses = records
      .filter((record) => record.type === RecordType.EXPENSE)
      .reduce((sum, record) => sum + Number(record.value), 0);

    // Calculate savings (income - expenses)
    const totalSaved = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      period: `Year ${year}`,
    };
  }

  // You can also add a method for detailed monthly summary
  async getDetailedMonthlySummary(userId: string, year: number, month: number) {
    // Implementation of detailed summary with breakdown by tags/categories
  }
}
