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
  UsePipes,
  ValidationPipe,
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
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const blog = await this.blogService.getPostById(id);
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    }
    return blog;
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createPost(@Body() data: CreateBlogDto): Promise<string> {
    return this.blogService.createPost(data);
  }
}
