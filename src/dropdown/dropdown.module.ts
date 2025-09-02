import { MongooseModule } from '@nestjs/mongoose';
import DropdownSchema, { Dropdown } from './Schema/dropdown.schema';
import { DropdownService } from './dropdown.service';
import { DropdownController } from './dropdown.controller';
import { Module } from '@nestjs/common';
import { ModuleSchema } from 'src/module/Schema/module.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { TutorflowRabbitMqModule } from 'src/rabbitmq/tutorflowRabbitMQ/tutorflow-rabbit-mq/tutorflow-rabbit-mq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownSchema },
      { name: Module.name, schema: ModuleSchema },
    ]),
    RabbitmqModule,
    TutorflowRabbitMqModule,
  ],
  providers: [DropdownService],
  controllers: [DropdownController],
})
export class DropdownModule {}
