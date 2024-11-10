import { IsString, MaxLength, MinLength } from 'class-validator';
import { TransactionType } from '../interfaces/type';

export class CreateTransactionDto {
  @IsString()
  type: TransactionType;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(9)
  ammount: number;
}
