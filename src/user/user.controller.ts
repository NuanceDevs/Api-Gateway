import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
// import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';

@Controller('user')
// @UseGuards(ThrottlerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  async getAllUsers(): Promise<any> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    console.log(typeof id);
    const blog = await this.userService.getUserById(id);
    if (!blog) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return blog;
  }

  @Post('create')
  async createUser(@Body() data: CreateUserDto): Promise<unknown> {
    if (!data) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(data);
  }
}