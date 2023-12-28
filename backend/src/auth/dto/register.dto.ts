import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
