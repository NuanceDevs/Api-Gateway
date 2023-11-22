import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { HttpException } from '@nestjs/common';
import { BlogService } from './blog.service';

// Define winstonMock before jest.mock

const winstonMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock('winston', () => ({
  ...jest.requireActual('winston'),

  createLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
}));

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
          provide: 'blogMicroservice',
          useValue: mockMicroserviceClient,
        },
        {
          provide: 'NestWinston',
          useValue: winstonMock,
        },
        {
          provide: 'winston',
          useValue: winstonMock,
        },
      ],
    }).compile();

    controller = module.get<BlogController>(BlogController);
    blogService = module.get<BlogService>(BlogService);
  });

  it('should return exception when id is not existent', async () => {
    const id = 1;

    jest.spyOn(blogService, 'getPostById').mockResolvedValue(null); // Mock the service to return null for the non-existent ID

    const result = await controller.getPostById(id);
    expect(result).toBeInstanceOf(HttpException);
  });
});
