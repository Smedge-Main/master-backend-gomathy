import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PipelineDto } from './Dto/pipeline.dto';
import { Pipeline } from './Schema/pipeline.schema';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Get()
  async getPipeline(): Promise<Pipeline[]> {
    return this.pipelineService.getpipeline();
  }

  @Post()
  async createPipeline(@Body() dto: PipelineDto): Promise<Pipeline> {
    console.log(dto);
    return this.pipelineService.createpipeline(dto);
  }

  @Patch(':id')
  async updatepipeline(
    @Param('id') id: string,
    @Body() dto: PipelineDto,
  ): Promise<Pipeline> {
    return this.pipelineService.Updatepipeline(id, dto);
  }

  
}
