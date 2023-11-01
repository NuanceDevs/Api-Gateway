import { BlogService } from './blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';
import { DeletePostDto } from './dto/DeletePost.dto';
// import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';

@Controller('blog')
// @UseGuards(ThrottlerGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('getAll')
  async getAllBlogs(): Promise<any> {
    return await this.blogService.getAllBlogs();
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    console.log(typeof id);
    const blog = await this.blogService.getPostById(id);
    if (!blog) {
      throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
    }
    return blog;
  }

  @Delete('delete')
  async deletePost(@Body() data: DeletePostDto): Promise<unknown> {
    if (!data) {
      throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
    }
    return await this.blogService.deletePost(data);
  }

  @Post('create')
  async createPost(@Body() data: CreatePostDto): Promise<unknown> {
    if (!data) {
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    }
    return await this.blogService.createPost(data);
  }
}
