import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserSettingsDto {
  @IsBoolean()
  @IsOptional()
  receivedNotification?: boolean;

  @IsBoolean()
  @IsOptional()
  receivedEmail?: boolean;

  @IsBoolean()
  @IsOptional()
  receivedSMS?: boolean;
}
