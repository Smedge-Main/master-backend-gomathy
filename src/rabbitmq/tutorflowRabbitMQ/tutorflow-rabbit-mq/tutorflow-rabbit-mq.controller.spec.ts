import { Test, TestingModule } from '@nestjs/testing';
import { TutorflowRabbitMqController } from './tutorflow-rabbit-mq.controller';

describe('TutorflowRabbitMqController', () => {
  let controller: TutorflowRabbitMqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorflowRabbitMqController],
    }).compile();

    controller = module.get<TutorflowRabbitMqController>(TutorflowRabbitMqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
