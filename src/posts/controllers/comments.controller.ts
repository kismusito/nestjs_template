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
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { CreatePostDto } from '../dto/post.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService ) {}


    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() commentDTO: CreateCommentDto) {
      return {
        success: true,
        post: await this.commentService.create(commentDTO),
        message: 'Post created successfully',
      };
    }
  
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCommentDTO: UpdateCommentDto,
    ) {
      await this.commentService.update(id, updateCommentDTO);
      return {
        success: true,
        message: 'Post updated successfully',
      };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.commentService.delete(id);
      return {
        success: true,
        message: 'Post removed successfully',
      };
    }
}
