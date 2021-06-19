import { PartialType } from '@nestjs/mapped-types';

export class CreateCommentDto {}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
