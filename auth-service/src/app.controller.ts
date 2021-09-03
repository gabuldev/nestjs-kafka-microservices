import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  pattern: string;
  constructor(
    private readonly appService: AppService,
  ) {
    this.pattern = 'challenge.correction';
  }



  @MessagePattern('challenge.correction')
  getHello(@Payload() message): string {
    console.log(message)
    return this.appService.getHello();
  }
}
