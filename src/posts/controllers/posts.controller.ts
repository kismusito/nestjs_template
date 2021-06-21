import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { PostsService } from '../services/posts.service';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto) {
    return {
      success: true,
      post: await this.postsService.create(createPostDto),
      message: 'Post created successfully',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      success: true,
      posts: await this.postsService.findAll(),
      message: 'Post found successfully',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      post: await this.postsService.findOne(id),
      message: 'Post found successfully',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    await this.postsService.update(id, updatePostDto);
    return {
      success: true,
      message: 'Post updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.postsService.remove(id);
    return {
      success: true,
      message: 'Post removed successfully',
    };
  }
}
