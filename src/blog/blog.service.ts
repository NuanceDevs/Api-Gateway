import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/createblog.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BlogService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
  ) {}

  async getAllBlogs(): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'getAllBlogs' }, {});
  }

  async getPostById(id: number): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'getPostById' }, id);
  }

  async createPost(blogDto: CreateBlogDto): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'createPost' }, blogDto);
  }

  updatePost(id: number): string {
    return `This action updates post #${id}`;
  }

  deletePost(id: number): string {
    return `This action removes post #${id}`;
  }
}
