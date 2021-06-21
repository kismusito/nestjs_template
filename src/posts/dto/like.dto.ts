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