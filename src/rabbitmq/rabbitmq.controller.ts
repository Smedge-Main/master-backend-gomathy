import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {
  collegeAdminClient: any;
  // constructor(
  //   @Inject('COLLEGE_ADMIN_SERVICE')
  //   private readonly rabbitmqService: RabbitmqService,
  // ) {}

  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Get()
  async fetchData() {
    const payload = {
      name: 'This is from app admin through rabbitmq',
    };

    const result = await this.collegeAdminClient
      .send({ cmd: 'create-college-admin' }, payload)
      .toPromise();

    return result;
  }

  @Get('ping')
  async ping() {
    try {
      const result = await this.collegeAdminClient
        .send({ cmd: 'check_microservice' }, { msg: 'Message from app admin' })
        .toPromise();

      console.log(result);
      return result;
    } catch (error) {
      console.error('Ms error: ', error);
    }
  }

  @Get('send-data')
  async sendData() {
    return (await this.rabbitmqService.sendCollegeAdminModules()).toPromise();
  }
}
