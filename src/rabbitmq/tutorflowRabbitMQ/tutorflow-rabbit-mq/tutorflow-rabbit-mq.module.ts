// tutorflow-rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorflowRabbitMqService } from './tutorflow-rabbit-mq.service';
import { Dropdown, DropdownOption } from 'src/dropdown/Schema/dropdown.schema';
import {
  Module as ModuleEntity,
  ModuleSchema,
} from 'src/module/Schema/module.schema';
import { Pipeline, PipelineSchema } from 'src/pipeline/Schema/pipeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownOption },
      { name: ModuleEntity.name, schema: ModuleSchema },
      { name: Pipeline.name, schema: PipelineSchema },
    ]),
    ClientsModule.register([
      {
        name: 'TUTOR_FLOW_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // 👈 change if needed
          queue: 'tutor_flow_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [TutorflowRabbitMqService],
  exports: [TutorflowRabbitMqService], // 👈 make it available outside
})
export class TutorflowRabbitMqModule {}
