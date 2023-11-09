import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    BlogModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000, //Time to live in milliseconds
        limit: 100, //Number of requests per ttl timeframe
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
