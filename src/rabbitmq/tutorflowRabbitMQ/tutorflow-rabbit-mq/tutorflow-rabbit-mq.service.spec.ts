import { Test, TestingModule } from '@nestjs/testing';
import { TutorflowRabbitMqService } from './tutorflow-rabbit-mq.service';

describe('TutorflowRabbitMqService', () => {
  let service: TutorflowRabbitMqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorflowRabbitMqService],
    }).compile();

    service = module.get<TutorflowRabbitMqService>(TutorflowRabbitMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
