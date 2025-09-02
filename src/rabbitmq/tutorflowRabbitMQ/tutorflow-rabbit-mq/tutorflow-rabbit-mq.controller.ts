import { Controller, Get } from '@nestjs/common';
import { TutorflowRabbitMqService } from './tutorflow-rabbit-mq.service';

@Controller('tutorflow-rabbit-mq')
export class TutorflowRabbitMqController {
  constructor(private readonly rabbitmqService: TutorflowRabbitMqService) {}

  @Get()
  getTutorData() {
    return { message: 'Tutor data works!' };
  }

  @Get('tutor-data')
  async sendData() {
    return (
      await this.rabbitmqService.sendTutorFlowModules('tutor flow')
    ).toPromise();
  }
}
