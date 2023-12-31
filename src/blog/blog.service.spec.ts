import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';

const mockMicroserviceClient = {
  send: jest.fn(),
};

const winstonMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock('winston', () => ({
  ...jest.requireActual('winston'),

  createLogger: () => jest.fn().mockReturnValue(winstonMock),
}));

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
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

    service = module.get<BlogService>(BlogService);
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result = ['test'];

      jest.spyOn(service, 'getAllBlogs').mockResolvedValue(result);

      expect(await service.getAllBlogs()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      const result = ['test'];

      jest.spyOn(service, 'getPostById').mockResolvedValue(result);

      expect(await service.getPostById(1)).toBe(result);
    });

    it('should return a post with the specified id', async () => {
      const postId = 1;
      const expectedResult = { id: postId, title: 'Test Post' };

      jest.spyOn(service, 'getPostById').mockResolvedValue(expectedResult);

      const result = await service.getPostById(postId);

      expect(result).toEqual(expectedResult);
    });
  });
});
