import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';




@Injectable()
export class AppService {
  constructor(@Inject('KAFKA_SERVICE') private client: ClientKafka) {}
 async onModuleInit() {
    this.client.subscribeToResponseOf('test');
    await this.client.connect();
  }

  async getHello(): Promise<string> {
    const result =  await lastValueFrom( this.client.send('test', 'foi gabul') )
    return result;
  }
}
