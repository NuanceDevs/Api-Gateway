import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { ClientProxy } from '@nestjs/microservices';
import { DeletePostDto } from './dto/DeletePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Injectable()
export class BlogService {
  constructor(
    @Inject('blogMicroservice') private readonly blogMicroservice: ClientProxy, // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAllBlogs(): Promise<unknown> {
    // this.logger.debug('getAllBlogs service called');
    return this.blogMicroservice.send({ cmd: 'getAllBlogs' }, {});
  }

  async getPostById(id: number): Promise<unknown> {
    // this.logger.debug('getPostById service called');
    return this.blogMicroservice.send({ cmd: 'getPostById' }, id);
  }

  async createPost(blogDto: CreatePostDto): Promise<unknown> {
    // this.logger.debug('createPost service called');
    return this.blogMicroservice.send({ cmd: 'createPost' }, blogDto);
  }

  async updatePost(blogDto: UpdatePostDto): Promise<unknown> {
    // this.logger.debug('updatePost service called');
    return `This action updates post #${blogDto.id}`;
  }

  async deletePost(postDto: DeletePostDto) {
    // this.logger.debug('deletePost service called');
    return this.blogMicroservice.send({ cmd: 'deletePost' }, postDto);
  }
}
