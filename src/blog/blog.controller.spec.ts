import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { HttpException } from '@nestjs/common';
import { BlogService } from './blog.service';

const mockMicroserviceClient = {
  send: jest.fn(),
};

describe('BlogController', () => {
  let controller: BlogController;
  let blogService: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        BlogService,
        {
          provide: 'SERVICE_A',
          useValue: mockMicroserviceClient,
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
    blogService = module.get<BlogService>(BlogService);
  });

  it('should return exception when id is not existent', async () => {
    const id = 1;

    jest.spyOn(blogService, 'getPostById');

    try {
      await controller.getPostById(id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
