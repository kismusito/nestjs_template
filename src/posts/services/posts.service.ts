import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { UsersService } from 'src/users/users.service';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const getUser = await this.userService.findOne(createPostDto.user);
    const newPost = this.postRepository.create({
      ...createPostDto,
      user: getUser,
    });
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    const getPost = await this.postRepository.findOne(id, {
      relations: ['user' , 'likes' , 'likes.user' , 'comments' , 'comments.user'],
    });
    if (!getPost) {
      throw new NotFoundException('Post not found');
    }
    return getPost;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const getPost = await this.findOne(id);
    const mergeData = this.postRepository.merge(getPost, {
      ...updatePostDto,
      user: getPost.user,
    });
    this.postRepository.save(mergeData);
  }

  async remove(id: number) {
    const getPost = await this.findOne(id);
    this.postRepository.remove(getPost);
  }
}
