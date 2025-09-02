import { Module } from '@nestjs/common';
import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pipeline, PipelineSchema } from './Schema/pipeline.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pipeline.name,
        schema: PipelineSchema,
      },
    ]),
    RabbitmqModule,
  ],
  controllers: [PipelineController],
  providers: [PipelineService],
})
export class PipelineModule {}
