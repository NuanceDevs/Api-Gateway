import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { DeletePostDto } from './dto/DeletePost.dto';
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
  Put,
  // UseGuards,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/UpdatePost.dto';
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

  @Put('update/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ): Promise<unknown> {
    if (!data) {
      throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
    }
    return await this.blogService.updatePost(data);
  }
}
