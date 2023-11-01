import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { ClientProxy } from '@nestjs/microservices';
import { DeletePostDto } from './dto/DeletePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('blogMicroservice') private readonly blogMicroservice: ClientProxy,
  ) {}

  async getAllBlogs(): Promise<unknown> {
    return this.blogMicroservice.send({ cmd: 'getAllBlogs' }, {});
  }

  async getPostById(id: number): Promise<unknown> {
    return this.blogMicroservice.send({ cmd: 'getPostById' }, id);
  }

  async createPost(blogDto: CreatePostDto): Promise<unknown> {
    return this.blogMicroservice.send({ cmd: 'createPost' }, blogDto);
  }

  async updatePost(blogDto: UpdatePostDto): Promise<unknown> {
    return `This action updates post #${blogDto.id}`;
  }

  async deletePost(postDto: DeletePostDto) {
    return this.blogMicroservice.send({ cmd: 'deletePost' }, postDto);
  }
}
