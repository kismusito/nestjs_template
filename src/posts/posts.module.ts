import { Module } from '@nestjs/common';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CommentsService } from './services/comments.service';
import { LikesService } from './services/likes.service';
import { CommentsController } from './controllers/comments.controller';

@Module({
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService, LikesService],
})
export class PostsModule {}
