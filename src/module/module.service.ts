import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Module as ModuleSchema,
  ModuleDocument,
  Module,
} from './Schema/module.schema';
import mongoose, { Model, Types } from 'mongoose';
import { ModuleDto } from './Dto/module.dto';
import {
  Pipeline,
  PipelineDocument,
} from 'src/pipeline/Schema/pipeline.schema';

@Injectable()
export class ModuleService {
  // moduleModel: any;
  constructor(
    @InjectModel(ModuleSchema.name) private moduleModel: Model<ModuleDocument>,
    @InjectModel(Pipeline.name)
    private pipelineModel: Model<PipelineDocument>,
  ) {}

  async getModule(id: string): Promise<ModuleSchema[]> {
    const model = await this.moduleModel.find();
    if (!model) throw new NotFoundException('modules not found');

    return model;
  }

  async createModule(
    pipelineId: string,
    dto: ModuleDto,
  ): Promise<ModuleSchema> {
    // Mongoose's create returns a saved document, no need to call save()

    const _id = new mongoose.Types.ObjectId(pipelineId);
    console.log('id: ', _id);

    const pipeline = await this.pipelineModel.findByIdAndUpdate(
      _id,
      {
        $inc: { noOfMod: 1 },
      },
      { new: true },
    );
    if (!pipeline) throw new NotFoundException("Can't able to find pipeline");

    const create = await this.moduleModel.create({
      ...dto,
      pipelineId: _id,
    });

    if (!create)
      throw new InternalServerErrorException("Can't able to create module");

    console.log('create: ', create);
    console.log('pipeline: ', pipeline);
    return create;
  }

  // async getModulesByPipeline(pipelineId: string): Promise<Module[]> {
  //   return this.moduleModel
  //     .find({ pipelineId: new Types.ObjectId(pipelineId) })
  //     .exec();
  // }

  async getModulesByPipeline(pipelineId: string): Promise<Module[]> {
    try {
      console.log('PipelineId received:', pipelineId);

      const id = new mongoose.Types.ObjectId(pipelineId);
      console.log('PipelineId converted:', id);

      const result = await this.moduleModel.find({
        pipelineId: id,
      });

      console.log('Modules found:', result);
      return result;
    } catch (error) {
      console.error('Error fetching modules by pipelineId:', error);
      throw error;
    }
  }
}
