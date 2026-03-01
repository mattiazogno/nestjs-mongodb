import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';


class EnvironmentVariables {
  @IsNumber()
  PORT: number = 3000;

  @IsString()
  MONGODB_URI: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Config validation error:\n${errors.map(e => e.toString()).join('\n')}`);
  }

  return validatedConfig;
}