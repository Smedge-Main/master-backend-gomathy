import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Module as ModuleSchema,
  ModuleDocument,
  Module,
} from './Schema/module.schema';
import mongoose, { Model, Types } from 'mongoose';
import { ModuleDto } from './Dto/module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(ModuleSchema.name) private modelModel: Model<ModuleDocument>,
  ) {}

  async getModule(id: string): Promise<ModuleSchema[]> {
    const model = await this.modelModel.find();
    if (!model) throw new NotFoundException('modules not found');

    return model;
  }
  async createModule(
    pipelineId: string,
    dto: ModuleDto,
  ): Promise<ModuleSchema> {
    // Mongoose's create returns a saved document, no need to call save()
    const create = await this.modelModel.create({
      ...dto,
      pipelineId: new mongoose.Types.ObjectId(pipelineId),
    });

    console.log(create);
    return create;
  }

  // async getModulesByPipeline(pipelineId: string): Promise<Module[]> {
  //   return this.modelModel
  //     .find({ pipelineId: new Types.ObjectId(pipelineId) })
  //     .exec();
  // }

  async getModulesByPipeline(pipelineId: string): Promise<Module[]> {
    try {
      console.log('PipelineId received:', pipelineId);

      const id = new mongoose.Types.ObjectId(pipelineId);
      console.log('PipelineId converted:', id);

      const result = await this.modelModel.find({
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
