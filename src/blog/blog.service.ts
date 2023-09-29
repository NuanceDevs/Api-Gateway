import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/createblog.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BlogService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
  ) {}

  async getAllBlogs(): Promise<any> {
    return this.clientServiceA.send({ cmd: 'getAllBlogs' }, {});
  }
  getPostById(id: number): string {
    return `This action returns post #${id}`;
  }

  async createPost(blogDto: CreateBlogDto): Promise<any> {
    return this.clientServiceA.send({ cmd: 'createPost' }, blogDto);
  }

  updatePost(id: number): string {
    return `This action updates post #${id}`;
  }

  deletePost(id: number): string {
    return `This action removes post #${id}`;
  }
}
