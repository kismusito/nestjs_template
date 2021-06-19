import { PartialType } from '@nestjs/mapped-types';

export class CreateLikeDto {}

export class UpdateLikeDto extends PartialType(CreateLikeDto) {}
