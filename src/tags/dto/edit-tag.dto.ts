import { IsString, IsOptional, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditTagDto {
  @IsOptional()
  @IsString({ message: 'Tag name must be a string' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsString({ message: 'Background color must be a string' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Background color must be in HEX format (e.g. #FF5733)',
  })
  colorBg: string;

  @IsOptional()
  @IsString({ message: 'Text color must be a string' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'Text color must be in HEX format (e.g. #FFFFFF)',
  })
  colorText: string;
}
