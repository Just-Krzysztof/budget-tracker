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
    const startDate = new Date(year, month - 1, 1); // Miesiące w JS są 0-indexed
    console.log('startDate', startDate);

    const endDate = new Date(year, month, 0); // Ostatni dzień miesiąca
    endDate.setHours(23, 59, 59, 999);
    console.log('endDate', endDate);

    // Pobieramy wszystkie rekordy finansowe użytkownika w danym miesiącu
    const records = await this.financialRecordRepository.find({
      where: {
        user: { id: userId },
        createdAt: Between(startDate, endDate),
      },
      relations: ['user'],
    });
    console.log('records', records);

    // Obliczamy sumę przychodów i wydatków
    const totalIncome = records
      .filter((record) => record.type === RecordType.INCOME)
      .reduce((sum, record) => sum + Number(record.value), 0);

    const totalExpenses = records
      .filter((record) => record.type === RecordType.EXPENSE)
      .reduce((sum, record) => sum + Number(record.value), 0);

    // Obliczamy oszczędności (przychody - wydatki)
    const totalSaved = totalIncome - totalExpenses;

    // Formatujemy nazwę miesiąca
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
    // Tworzymy zakres dat dla wybranego roku
    const startDate = new Date(year, 0, 1); // 1 stycznia
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // 31 grudnia, 23:59:59.999

    // Pobieramy wszystkie rekordy finansowe użytkownika w danym roku
    const records = await this.financialRecordRepository.find({
      where: {
        user: { id: userId },
        createdAt: Between(startDate, endDate),
      },
      relations: ['user'],
    });

    // Obliczamy sumę przychodów i wydatków
    const totalIncome = records
      .filter((record) => record.type === RecordType.INCOME)
      .reduce((sum, record) => sum + Number(record.value), 0);

    const totalExpenses = records
      .filter((record) => record.type === RecordType.EXPENSE)
      .reduce((sum, record) => sum + Number(record.value), 0);

    // Obliczamy oszczędności (przychody - wydatki)
    const totalSaved = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      totalSaved,
      period: `Rok ${year}`,
    };
  }

  // Możesz również dodać metodę do szczegółowego podsumowania miesięcznego
  async getDetailedMonthlySummary(userId: string, year: number, month: number) {
    // Implementacja szczegółowego podsumowania z podziałem na tagi/kategorie
  }
}
