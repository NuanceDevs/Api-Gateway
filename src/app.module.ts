import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('Api Gateway', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'error-warnings.log',
          level: 'warn',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    BlogModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1000, //Time to live in milliseconds
        limit: 100, //Number of requests per ttl timeframe
      },
    ]),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
