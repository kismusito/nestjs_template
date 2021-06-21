import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
