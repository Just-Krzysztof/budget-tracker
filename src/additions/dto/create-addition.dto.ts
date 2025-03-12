import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AdditionType } from '../entities/additions.entity';

export class CreateAdditionDto {
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

  @IsEnum(AdditionType)
  type: AdditionType;
}
