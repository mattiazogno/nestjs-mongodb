import { IsDateString, IsMongoId, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CursorPaginationDto {
  @IsOptional()
  @IsDateString()
  cursor?: string;          // ISO string del createdAt dell'ultimo elemento precedente

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100, { message: 'Non superare 100 elementi per pagina per protezione DoS' })
  limit = 10;

  // Opzionale: se un giorno vorrai supportare anche asc
  @IsOptional()
  @IsNumber()
  direction: 1 | -1 = -1;   // -1 = newest first (default)
}