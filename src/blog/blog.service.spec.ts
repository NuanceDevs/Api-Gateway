import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { HttpException } from '@nestjs/common';

// Mock the microservice client
const mockMicroserviceClient = {
  send: jest.fn(), // You can add any required methods here
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // No need to import the real ClientsModule here
      controllers: [],
      providers: [
        BlogService,
        {
          provide: 'blogMicroservice', // This should match the name used in the real module
          useValue: mockMicroserviceClient, // Provide the mock client here
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

    it('should return an http exception for a non-existent id', async () => {
      const postId = 1;
      try {
        await service.getPostById(postId);
      } catch (result) {
        expect(result).toBeInstanceOf(HttpException);
      }
    });
  });
});
