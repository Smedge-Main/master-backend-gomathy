import { Injectable, NotFoundException } from '@nestjs/common';
import { Pipeline, PipelineDocument } from './Schema/pipeline.schema';
import { PipelineDto } from './Dto/pipeline.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PipelineService {
  constructor(
    @InjectModel(Pipeline.name) private pipelineModel: Model<PipelineDocument>,
  ) {}

  async getpipeline(): Promise<Pipeline[]> {
    const pipeline = await this.pipelineModel.find();
    console.log(pipeline);
    return pipeline;
  }

  async createpipeline(dto: PipelineDto): Promise<Pipeline> {
    const create = await this.pipelineModel.create(dto);
    console.log(create);

    return create;
  }

  async Updatepipeline(id: string, dto: PipelineDto): Promise<Pipeline> {
    const updatedpipeline = await this.pipelineModel.findByIdAndUpdate(
      id,
      dto,
      {
        new: true,
      },
    );
    if (!updatedpipeline)
      throw new NotFoundException(`Pipeline with this ${id} is not found`);
    return updatedpipeline;
  }
}
