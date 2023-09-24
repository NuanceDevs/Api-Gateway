import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/createblog.dto';

@Injectable()
export class BlogService {
  getAllPosts(): string {
    return 'This action returns all posts';
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
