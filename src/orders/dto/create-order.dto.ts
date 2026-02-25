import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'user deve essere un ObjectId valido' })
  user!: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;

  @IsOptional()
  @IsEnum(['pending', 'paid', 'shipped', 'cancelled'])
  status?: string;
}