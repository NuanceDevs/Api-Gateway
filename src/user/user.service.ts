import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('SERVICE_B') private readonly clientServiceB: ClientProxy,
  ) {}

  async getAllUsers(): Promise<unknown> {
    return this.clientServiceB.send({ cmd: 'getAllUsers' }, {});
  }

  async getUserById(id: any): Promise<unknown> {
    return this.clientServiceB.send({ cmd: 'getUserById' }, id);
  }

  async createUser(userDTO: CreateUserDto): Promise<unknown> {
    return this.clientServiceB.send({ cmd: 'createUser' }, userDTO);
  }

  updateUser(id: number): string {
    return `This action updates a user #${id}`;
  }

  deleteUser(id: number): string {
    return `This action removes a user #${id}`;
  }
}