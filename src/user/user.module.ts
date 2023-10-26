import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SERVICE_A',
        transport: Transport.TCP,
        options: {
          host: process.env.MS_BLOG_HOST || 'localhost',
          port: 8888,
        },
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}