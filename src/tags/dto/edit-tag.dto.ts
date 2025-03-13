import { IsString, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditTagDto {
  @IsOptional()
  @IsString({ message: 'Nazwa tagu musi być tekstem' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsString({ message: 'Kolor tła musi być tekstem' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Kolor tła musi być w formacie HEX (np. #FF5733)',
  })
  colorBg: string;

  @IsOptional()
  @IsString({ message: 'Kolor tła musi być tekstem' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Kolor tła musi być w formacie HEX (np. #FF5733)',
  })
  colorText: string;
}
