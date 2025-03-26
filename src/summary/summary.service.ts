import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FinancialRecord } from '../financialRecords/entities/financialRecords.entity';
import { RecordType } from '../financialRecords/enums/record-type.enum';
import {
  SummaryResponseDto,
  CurrencySummary,
} from './dto/summary-response.dto';

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

    const endDate = new Date(year, month, 0); // Last day of the month
    endDate.setHours(23, 59, 59, 999);

    // Get all financial records of the user for the given month
    const records = await this.financialRecordRepository.find({
      where: {
        user: { id: userId },
        date: Between(startDate, endDate),
      },
      relations: ['user'],
    });

    const { totalIncome, totalExpenses, totalSaved, currencies } =
      this.calculateCurrencySummaries(records);

    // Format the month name
    const monthName = new Date(year, month - 1).toLocaleString('pl-PL', {
      month: 'long',
    });

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      period: `${monthName} ${year}`,
      currencies,
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
        date: Between(startDate, endDate),
      },
      relations: ['user'],
    });

    const { totalIncome, totalExpenses, totalSaved, currencies } =
      this.calculateCurrencySummaries(records);

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      period: `Year ${year}`,
      currencies,
    };
  }

  private calculateCurrencySummaries(records: FinancialRecord[]): {
    totalIncome: number;
    totalExpenses: number;
    totalSaved: number;
    currencies: CurrencySummary[];
  } {
    // Podsumowanie z podziałem na waluty
    const currencyMap = new Map<string, CurrencySummary>();

    // Dzielimy rekordy według waluty
    records.forEach((record) => {
      const { currency, type, value } = record;
      if (!currencyMap.has(currency)) {
        currencyMap.set(currency, {
          currency,
          income: 0,
          expenses: 0,
          saved: 0,
        });
      }

      const summary = currencyMap.get(currency);

      // Dodajemy sprawdzenie, czy summary istnieje
      if (summary) {
        if (type === RecordType.INCOME) {
          summary.income = Number((summary.income + Number(value)).toFixed(2));
        } else if (type === RecordType.EXPENSE) {
          summary.expenses = Number(
            (summary.expenses + Number(value)).toFixed(2),
          );
        }

        summary.saved = Number((summary.income - summary.expenses).toFixed(2));
      }
    });

    // Obliczamy całkowite sumy (można to później usunąć, jeśli będziemy prezentować tylko sumy per waluta)
    const totalIncome = Number(
      records
        .filter((record) => record.type === RecordType.INCOME)
        .reduce((sum, record) => sum + Number(record.value), 0)
        .toFixed(2),
    );

    const totalExpenses = Number(
      records
        .filter((record) => record.type === RecordType.EXPENSE)
        .reduce((sum, record) => sum + Number(record.value), 0)
        .toFixed(2),
    );

    const totalSaved = Number((totalIncome - totalExpenses).toFixed(2));

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      currencies: Array.from(currencyMap.values()),
    };
  }

  // You can also add a method for detailed monthly summary
  async getDetailedMonthlySummary(userId: string, year: number, month: number) {
    // Implementation of detailed summary with breakdown by tags/categories
  }
}
