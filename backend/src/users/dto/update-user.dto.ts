import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  age: number;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  @IsOptional()
  password: string;
}
