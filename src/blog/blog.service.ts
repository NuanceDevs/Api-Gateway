import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { ClientProxy } from '@nestjs/microservices';
import { DeletePostDto } from './dto/DeletePost.dto';

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

  updatePost(id: number): string {
    return `This action updates post #${id}`;
  }

  async deletePost(postDto: DeletePostDto) {
    return this.clientServiceA.send({ cmd: 'deletePost' }, postDto);
  }
}
