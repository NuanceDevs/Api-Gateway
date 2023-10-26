import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common';

// Mock the microservice client
const mockMicroserviceClient = {
  send: jest.fn(), // You can add any required methods here
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // No need to import the real ClientsModule here
      controllers: [],
      providers: [
        UserService,
        {
          provide: 'SERVICE_A', // This should match the name used in the real module
          useValue: mockMicroserviceClient, // Provide the mock client here
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['test'];

      jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);

      expect(await service.getAllUsers()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = ['test'];

      jest.spyOn(service, 'getUserById').mockResolvedValue(result);

      expect(await service.getUserById(1)).toBe(result);
    });

    it('should return a user with the specified id', async () => {
      const userID = 1;
      const expectedResult = { id: userID, name: 'Test user' };

      jest.spyOn(service, 'getUserById').mockResolvedValue(expectedResult);

      const result = await service.getUserById(userID);

      expect(result).toEqual(expectedResult);
    });

    it('should return an http exception for a non-existent id', async () => {
      const userID = 1;
      try {
        await service.getUserById(userID);
      } catch (result) {
        expect(result).toBeInstanceOf(HttpException);
      }
    });
  });
});