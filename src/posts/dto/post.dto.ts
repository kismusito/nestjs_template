import { PartialType } from '@nestjs/mapped-types';

export class CreatePostDto {}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
