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

  @Get('getAllUsers')
  async getAllUsers(): Promise<any> {
    console.log('getAllUsers received');
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    console.log(typeof id);
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Post('create')
  async createUser(@Body() data: CreateUserDto): Promise<unknown> {
    if (!data) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.createUser(data);
  }
}