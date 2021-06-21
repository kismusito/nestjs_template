import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { CreateCommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { Comment } from '../entities/comment.entity';
import { PostsService } from './posts.service';

@Injectable()
export class CommentsService {

    constructor(
        private userService: UsersService ,
        private postService: PostsService , 
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) {}

    async findOne(id: number){
        const getComment = await this.commentRepository.findOne(id)
        if(!getComment) {
            throw new NotFoundException('Comment not found')
        }
        return getComment
     }

    async create(createCommentDto: CreateCommentDto){
        const user = await this.userService.findOne(createCommentDto.user)
        const post = await this.postService.findOne(createCommentDto.post)
        const newLike = this.commentRepository.create({...createCommentDto , post , user})
        return this.commentRepository.save(newLike)
    }

    async update(id: number,updateCommentDto: UpdateCommentDto){
        const getComment = await this.findOne(id)
        const mergeData = this.commentRepository.merge(getComment , {...updateCommentDto , user: getComment.user , post: getComment.post})
        this.commentRepository.save(mergeData)
    }

    async delete(id:number){
        const getComment = await this.findOne(id)
        this.commentRepository.remove(getComment)
    }
}
