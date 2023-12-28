import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOneBy({
      id: createPostDto.user,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newPost = this.postRepository.create({ ...createPostDto, user });
    return await this.postRepository.save(newPost);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update({ id }, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepository.softDelete({ id });
  }
}
