import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { RecordType } from '../enums/record-type.enum';

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

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsEnum(RecordType)
  type: RecordType;
}
