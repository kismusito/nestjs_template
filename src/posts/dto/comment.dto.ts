import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  post: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
