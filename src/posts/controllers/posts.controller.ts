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
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from '../dto/like.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService , private readonly likeService: LikesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDto: CreatePostDto) {
    return {
      success: true,
      post: await this.postsService.create(createPostDto),
      message: 'Post created successfully',
    };
  }

  @Post('/like')
  @HttpCode(HttpStatus.CREATED)
  async createLike(@Body() createLikeDto: CreateLikeDto) {
    await this.likeService.createLike(createLikeDto)
    return {
      success: true,
      message: 'Liked successfully',
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

  
  @Delete('/unlike/:id')
  @HttpCode(HttpStatus.CREATED)
  async removeLike(@Param('id', ParseIntPipe) id: number) {
    await this.likeService.removeLike(id)
    return {
      success: true,
      message: 'Like removed successfully',
    };
  }
}
