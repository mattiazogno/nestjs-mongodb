import { ValidateNested } from 'class-validator';
import { CreateUserSettingsDto } from './create-setting.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class UpdateUserSettingsDto extends PartialType(CreateUserSettingsDto) {
  // ← opzionale: puoi lasciare vuoto se vuoi solo ereditare i campi parziali

  // MA se vuoi validare nested quando arriva dentro { settings: { ... } }
  // devi aggiungere questi decoratori QUI (nel DTO di update)
  @ValidateNested({ each: false })
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto; // ← se il body è { settings: {...} }
}
