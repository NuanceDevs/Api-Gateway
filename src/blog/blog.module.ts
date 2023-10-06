import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'blogMicroservice',
        transport: Transport.TCP,
        options: {
          host: process.env.MS_BLOG_HOST || 'localhost',
          port: 8888,
        },
      },
    ]),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
