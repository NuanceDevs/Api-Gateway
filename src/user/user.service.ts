import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('SERVICE_A') private readonly clientServiceA: ClientProxy,
  ) {}

  async getAllUsers(): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'getAllUsers' }, {});
  }

  async getUserById(id: number): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'getUserById' }, id);
  }

  async createUser(userDTO: CreateUserDto): Promise<unknown> {
    return this.clientServiceA.send({ cmd: 'createUser' }, userDTO);
  }

  updateUser(id: number): string {
    return `This action updates a user #${id}`;
  }

  deleteUser(id: number): string {
    return `This action removes a user #${id}`;
  }
}