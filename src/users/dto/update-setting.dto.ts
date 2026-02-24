import { CreateUserSettingsDto } from "./create-setting.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserSettingsDto extends PartialType(CreateUserSettingsDto) {}