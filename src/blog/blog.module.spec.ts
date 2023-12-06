import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { BlogModule } from './blog.module';
import { BlogService } from './blog.service';
import { ClientsModule } from '@nestjs/microservices';

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
  let clientModule: ClientsModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BlogModule, ClientsModule.register([])],
      providers: [BlogService],
    })
      .useMocker(() => createMock())
      .compile();

    clientModule = module.get<ClientsModule>(ClientsModule);
  });

  it('should import ClientsModule', () => {
    expect(clientModule).toBeDefined();
  });
});
