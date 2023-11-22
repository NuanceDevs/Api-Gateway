import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';

// Mock the entire winston module
jest.mock('winston', () => {
  const originalModule = jest.requireActual('winston');
  return {
    ...originalModule,
    createLogger: jest.fn().mockReturnValue({
      debug: jest.fn(), // Mock debug method
      info: jest.fn(), // Mock info method
      warn: jest.fn(), // Mock warn method
      error: jest.fn(), // Mock error method
      // Add other methods as needed
    }),
  };
});

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [WinstonModule.forRoot({})], // Use an empty config for WinstonModule
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
