import { Test, TestingModule } from '@nestjs/testing';
import { BlogModule } from './blog.module';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

// Corrected mock for ClientsModule
jest.mock('@nestjs/microservices', () => ({
  ClientsModule: {
    register: jest.fn().mockImplementation(() => ({
      // Mock implementation or empty object
    })),
  },
  Transport,
}));

// Mock for winston
const winstonMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock('winston', () => ({
  ...jest.requireActual('winston'),
  createLogger: () => winstonMock,
}));

describe('BlogModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [BlogModule, ClientsModule.register([])],
      providers: [
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: winstonMock,
        },
        // Include any other dependencies needed by BlogModule here
      ],
    }).compile();
  });
});

describe('BlogModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        // Import the actual BlogModule
        BlogModule,
        // Import or mock ClientsModule
        ClientsModule.register([]),
      ],
      providers: [
        // Provide the WINSTON_MODULE_PROVIDER mock
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: winstonMock,
        },
        // Include any other dependencies needed by BlogModule here
      ],
    }).compile();
  });

  it('should import ClientsModule', () => {
    // Test to verify if ClientsModule is imported correctly
    const clientsModule = module.get<ClientsModule>(ClientsModule);
    expect(clientsModule).toBeDefined();
  });

  it('should provide BlogService', () => {
    // Test to verify if BlogService is provided
    const blogService = module.get<BlogService>(BlogService);
    expect(blogService).toBeDefined();
  });

  it('should declare BlogController', () => {
    // Test to verify if BlogController is declared
    const blogController = module.get<BlogController>(BlogController);
    expect(blogController).toBeDefined();
  });
});
