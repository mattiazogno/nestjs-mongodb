import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserSettingsDto } from './create-setting.dto';
import { Type } from 'class-transformer';
import { CreatePostDto } from './create-posts.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  // ONE TO ONE, embedded
  @IsOptional()
  @Type(() => CreateUserSettingsDto) // ← OBBLIGATORIO: dice a class-transformer quale classe usare per l'istanziazione
  settings?: CreateUserSettingsDto;

  // ONE TO MANY
  @IsOptional()
  @ValidateNested({ each: true }) // ← attiva la validazione ricorsiva
  @Type(() => CreatePostDto) // ← OBBLIGATORIO: dice a class-transformer quale classe usare per l'istanziazione
  post?: CreatePostDto[];
}
