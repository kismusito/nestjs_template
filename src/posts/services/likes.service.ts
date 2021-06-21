import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { CreateLikeDto } from '../dto/like.dto';
import { Like } from '../entities/like.entity';
import { PostsService } from './posts.service';

@Injectable()
export class LikesService {

    constructor(
        private userService: UsersService ,
        private postService: PostsService , 
        @InjectRepository(Like) private likeRepository: Repository<Like>
    ) {}

    async createLike(createLikeDto: CreateLikeDto) {
        const user = await this.userService.findOne(createLikeDto.user)
        const post = await this.postService.findOne(createLikeDto.post)
        const newLike = this.likeRepository.create({post , user})
        return this.likeRepository.save(newLike)
    }

    async findOne(id: number){
        const getLike = await this.likeRepository.findOne(id)
        if(!getLike) {
            throw new NotFoundException('Like not found')
        }
        return getLike
     }

    async removeLike(id: number) {
        const getLike = await this.findOne(id)
        this.likeRepository.remove(getLike)
    }
}
