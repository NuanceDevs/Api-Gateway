import { BlogService } from './blog.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/createblog.dto';

@Controller('blog')
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
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    }
    return blog;
  }

  @Post('create')
  async createPost(@Body() data: CreateBlogDto): Promise<unknown> {
    if (!data) {
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    }
    return await this.blogService.createPost(data);
  }
}
