import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ModuleService } from './module.service';
import {
  Module as ModuleSchema,
  ModuleDocument,
  Module,
} from './Schema/module.schema';
import { ModuleDto } from './Dto/module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  async getModule(@Param('id') id: string): Promise<ModuleSchema[]> {
    return this.moduleService.getModule(id);
  }

  @Post(':pipelineId')
  async createModule(
    @Param('pipelineId') pipelineId: string,
    @Body() dto: ModuleDto,
  ): Promise<ModuleSchema> {
    console.log(dto);
    return this.moduleService.createModule(pipelineId, dto);
  }

  @Get('pipeline/:pipelineId')
  async getModulesByPipeline(
    @Param('pipelineId') pipelineId: string,
  ): Promise<Module[]> {
    return this.moduleService.getModulesByPipeline(pipelineId);
  }
}
