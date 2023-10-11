import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/createblog.dto';
import { ClientProxy } from '@nestjs/microservices';

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

  async createPost(blogDto: CreateBlogDto): Promise<unknown> {
    return this.blogMicroservice.send({ cmd: 'createPost' }, blogDto);
  }

  async updatePost(id: number, data: CreateBlogDto): Promise<unknown> {
    return this.blogMicroservice.send({ cmd: 'updatePost' }, { id, data });
  }

  deletePost(id: number): string {
    return `This action removes post #${id}`;
  }
}
