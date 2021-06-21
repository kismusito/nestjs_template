import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  post: number;
}

export class UpdateLikeDto extends PartialType(CreateLikeDto) {}
