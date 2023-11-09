import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { BlogService } from 'src/blog/blog.service';

const mockMicroserviceClient = {
  send: jest.fn(),
};

describe('BlogController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'SERVICE_B',
          useValue: mockMicroserviceClient,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should return exception when id is not existent', async () => {
    const id = 1;
    jest.spyOn(userService,'getUserById');

    try {
      await controller.getUserById(id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});