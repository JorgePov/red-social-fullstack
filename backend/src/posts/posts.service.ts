import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { SearchPostsDto } from './dto/search-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, user: UserActiveInterface) {
    const validUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (!validUser) {
      throw new BadRequestException('User not found');
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      user: validUser,
    });
    return await this.postRepository.save(newPost);
  }

  async findAll(searchParams: SearchPostsDto) {
    const queryBuilder = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.likes',
        'post.createdAt',
        'user.fullName',
        'user.email',
      ])
      .orderBy('post.createdAt', 'DESC');

    if (searchParams.title) {
      queryBuilder.andWhere('LOWER(post.title) LIKE LOWER(:title)', {
        title: `%${searchParams.title}%`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.likes',
        'post.createdAt',
        'user.id',
        'user.fullName',
        'user.email',
      ])
      .getOne();
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update({ id }, updatePostDto);
  }

  async remove(id: number, user: UserActiveInterface) {
    const currentPost = await this.postRepository.findOneBy({
      id: id,
    });

    if (currentPost.user.email !== user.email) {
      throw new BadRequestException('You are not the owner of this post');
    }

    return await this.postRepository.softDelete({ id });
  }
}
