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

  createPost(blogDto: CreateBlogDto): string {
    return `This action adds a new post {${blogDto}}`;
  }

  updatePost(id: number): string {
    return `This action updates post #${id}`;
  }

  deletePost(id: number): string {
    return `This action removes post #${id}`;
  }
}
