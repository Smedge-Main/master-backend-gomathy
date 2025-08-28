// import { Module } from '@nestjs/common';
// // import { RabbitmqController } from './rabbitmq.controller';
// import { RabbitmqController } from './rabbitmq.controller';
// import { RabbitmqService } from './rabbitmq.service';
// import { MicroservicesClientModule } from 'src/shared/microservices-client.module';

// @Module({
//   imports: [MicroservicesClientModule],
//   controllers: [RabbitmqController],
//   providers: [RabbitmqService],
// })
// export class RabbitmqModule {}

// rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq.service';
import DropdownSchema, { Dropdown } from 'src/dropdown/Schema/dropdown.schema';
import { ModuleSchema } from 'src/module/Schema/module.schema';
import { Pipeline, PipelineSchema } from 'src/pipeline/Schema/pipeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownSchema },
      { name: Module.name, schema: ModuleSchema },
      { name: Pipeline.name, schema: PipelineSchema },
    ]),

    ClientsModule.register([
      {
        name: 'COLLEGE_ADMIN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // 👉 un RabbitMQ connection string
          queue: 'college_admin_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [RabbitmqController],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
