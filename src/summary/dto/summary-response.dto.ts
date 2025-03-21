export interface CurrencySummary {
  currency: string;
  income: number;
  expenses: number;
  saved: number;
}

export class SummaryResponseDto {
  totalIncome: number;
  totalExpenses: number;
  totalSaved: number;
  period: string;
  currencies: CurrencySummary[];
}
