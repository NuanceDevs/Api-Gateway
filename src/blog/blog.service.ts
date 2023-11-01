import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { ClientProxy } from '@nestjs/microservices';
import { DeletePostDto } from './dto/DeletePost.dto';

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

  async createPost(postDto: CreatePostDto): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'createPost' }, postDto);
  }

  async updatePost(id: number) {
    return `This action updates post #${id}`;
  }

  async deletePost(postDto: DeletePostDto) {
    return this.clientServiceA.send({ cmd: 'deletePost' }, postDto);
  }
}
