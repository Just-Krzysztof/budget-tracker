import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { FinancialRecordType } from '../entities/financialRecords.entity';

export class CreateFinancialRecordDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  description: string;

  @IsEnum(FinancialRecordType)
  type: FinancialRecordType;
}
