import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserSettingsDto } from "./create-setting.dto";
import { Type } from "class-transformer";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()  
  username!: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  // ONE TO ONE, embedded
  @IsOptional()
  @ValidateNested({ each: false })       // ← attiva la validazione ricorsiva (each: false perché non array)
  @Type(() => CreateUserSettingsDto)     // ← OBBLIGATORIO: dice a class-transformer quale classe usare per l'istanziazione
  createSettings?:CreateUserSettingsDto ;
}
