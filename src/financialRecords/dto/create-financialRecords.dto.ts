import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDecimal,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { RecordType } from '../enums/record-type.enum';

export class CreateFinancialRecordDto {
  @Transform(
    ({ value }) => (typeof value === 'number' ? value.toString() : value),
    { toClassOnly: true },
  )
  @IsDecimal({ decimal_digits: '0,2' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value), { toPlainOnly: true })
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
