import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const getUser = await this.userRepository.findOne(id);
    if (!getUser) {
      throw new NotFoundException('User not found');
    }
    return getUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const getUser = await this.findOne(id);
    const mergeData = this.userRepository.merge(getUser, updateUserDto);
    this.userRepository.save(mergeData);
  }

  async remove(id: number): Promise<void> {
    const getUser = await this.findOne(id);
    this.userRepository.remove(getUser);
  }
}
