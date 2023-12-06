import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { HttpException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Observable } from 'rxjs';
import { UpdatePostDto } from './dto/UpdatePost.dto';

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

  describe('getPostById', () => {
    it('should return exception when id is not existent', async () => {
      const id = 1;

      jest.spyOn(blogService, 'getPostById').mockResolvedValue(null);

      const result = await controller.getPostById(id);
      expect(result).toBeInstanceOf(HttpException);
    });

    it('should return a blog', async () => {
      const id = 1;
      const mockBlog = { id, title: 'Test Blog', content: 'Test Content' };
      jest.spyOn(blogService, 'getPostById').mockResolvedValue(mockBlog);

      const result = await controller.getPostById(id);
      expect(result).toEqual(mockBlog);
    });

    describe('getAllBlogs', () => {
      it('should return all blogs', async () => {
        const mockBlogs = [
          { id: 1, title: 'Test Blog', content: 'Test Content' },
        ];
        jest.spyOn(blogService, 'getAllBlogs').mockResolvedValue(mockBlogs);

        const result = await controller.getAllBlogs();
        expect(result).toEqual(mockBlogs);
      });

      it('should handle errors', async () => {
        jest.spyOn(blogService, 'getAllBlogs').mockImplementation(() => {
          throw new Error();
        });

        await expect(controller.getAllBlogs()).rejects.toThrow(Error);
      });
    });
    describe('deletePost', () => {
      it('should delete a post', async () => {
        const deletePostDto = { id: 1 };
        jest
          .spyOn(blogService, 'deletePost')
          .mockResolvedValue(new Observable<true>()); // directly resolve to true

        const result = await controller.deletePost(deletePostDto);
        expect(result).toBeInstanceOf(Observable);
      });

      // it('should return exception when id is not existent', async () => {
      //   const deletePostDto = { id: 1 };

      //   jest
      //     .spyOn(blogService, 'deletePost')
      //     .mockResolvedValue(new Observable<false>()); // directly resolve to false

      //   const result = await controller.deletePost(deletePostDto);
      //   expect(result).toBeInstanceOf(HttpException);
      // });

      // it('should handle errors', async () => {
      //   jest.spyOn(blogService, 'deletePost').mockImplementation(() => {
      //     throw new Error();
      //   });

      //   await expect(controller.deletePost({ id: 1 })).rejects.toThrow(Error);
      // });
    });

    describe('createPost', () => {
      it('should create a post', async () => {
        const createPostDto = { title: 'New Blog', content: 'New Content' };
        jest
          .spyOn(blogService, 'createPost')
          .mockResolvedValue({ id: 1, ...createPostDto });

        const result = await controller.createPost(createPostDto);
        expect(result).toEqual({ id: 1, ...createPostDto });
      });

      it('should handle errors', async () => {
        jest.spyOn(blogService, 'createPost').mockImplementation(() => {
          throw new Error();
        });

        await expect(
          controller.createPost({ title: 'New Blog', content: 'New Content' }),
        ).rejects.toThrow(Error);
      });
    });

    describe('updatePost', () => {
      it('should update a post', async () => {
        const updatePostDto = {
          id: '1',
          title: 'Updated Blog',
          content: 'Updated Content',
        };
        jest
          .spyOn(blogService, 'updatePost')
          .mockResolvedValue({ id: 1, ...updatePostDto });

        const result = await controller.updatePost(1, updatePostDto);
        expect(result).toEqual({ id: 1, ...updatePostDto });
      });

      // Should update a post with valid data

      it('should handle errors', async () => {
        jest.spyOn(blogService, 'updatePost').mockImplementation(() => {
          throw new Error();
        });

        await expect(
          controller.updatePost(1, {
            id: '1',
            title: 'Updated Blog',
            content: 'Updated Content',
          }),
        ).rejects.toThrow(Error);
      });
    });
  });
});
