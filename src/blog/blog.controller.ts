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
  Inject,
  Put,
  Logger,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('getAll')
  async getAllBlogs(): Promise<any> {
    try {
      this.logger.debug('getAllBlogs endpoint called');
      return await this.blogService.getAllBlogs();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    this.logger.debug('getPostById endpoint called');
    try {
      const blog = await this.blogService.getPostById(id);
      if (!blog) {
        this.logger.debug('Blog not found');
        return new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return blog;
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Delete('delete')
  async deletePost(@Body() data: DeletePostDto): Promise<unknown> {
    try {
      this.logger.debug('deletePost endpoint called');
      if (!data) {
        this.logger.debug('Blog not found');
        throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
      }
      return await this.blogService.deletePost(data);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('create')
  async createPost(@Body() data: CreatePostDto): Promise<unknown> {
    this.logger.debug('createPost endpoint called');
    try {
      if (!data) {
        throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
      }
      return await this.blogService.createPost(data);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Put('update/:id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ): Promise<unknown> {
    this.logger.debug('updatePost endpoint called');
    try {
      if (!data) {
        throw new HttpException('Blog not found', HttpStatus.BAD_REQUEST);
      }
      return await this.blogService.updatePost(data);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
