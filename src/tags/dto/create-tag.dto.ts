import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTagDto {
  @IsNotEmpty({ message: 'Nazwa tagu jest wymagana' })
  @IsString({ message: 'Nazwa tagu musi być tekstem' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsString({ message: 'Kolor tła musi być tekstem' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Kolor tła musi być w formacie HEX (np. #FF5733)',
  })
  colorBg: string = '#3498DB'; // Domyślny kolor niebieski

  @IsOptional()
  @IsString({ message: 'Kolor tekstu musi być tekstem' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Kolor tekstu musi być w formacie HEX (np. #FFFFFF)',
  })
  colorText: string = '#FFFFFF'; // Domyślny kolor biały
}
