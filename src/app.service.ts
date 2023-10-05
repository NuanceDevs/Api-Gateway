import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // pingServiceA() {
  //   const startTs = Date.now();
  //   const pattern = { cmd: 'ping' };
  //   const payload = {};
  //   return this.clientServiceA
  //     .send<string>(pattern, payload)
  //     .pipe(
  //       map((message: string) => ({ message, duration: Date.now() - startTs })),
  //     );
}
