import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { CommentsService } from './services/comments.service';
import { LikesService } from './services/likes.service';
import { CommentsController } from './controllers/comments.controller';
import { UsersModule } from 'src/users/users.module';
import { Post } from './entities/post.entity';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, Like, Comment])],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService, LikesService],
})
export class PostsModule {}
