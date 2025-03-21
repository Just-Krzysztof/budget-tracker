import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecordType } from '../enums/record-type.enum';

export class CreateFinancialRecordDto {
  @IsDecimal({ decimal_digits: '0,2' })
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

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsEnum(RecordType)
  type: RecordType;
}
