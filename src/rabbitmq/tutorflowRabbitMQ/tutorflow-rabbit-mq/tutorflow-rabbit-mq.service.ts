import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dropdown } from 'src/dropdown/Schema/dropdown.schema';
import { Module } from 'src/module/Schema/module.schema';
import { Pipeline } from 'src/pipeline/Schema/pipeline.schema';

interface ModuleWithDropdowns {
  moduleName?: string;
  pipelineName: string;
  dropdowns: {
    dropdownName: string;
    options: string[];
  }[];
}

@Injectable()
export class TutorflowRabbitMqService {
  constructor(
    @InjectModel(Pipeline.name) private readonly pipelineModel: Model<Pipeline>,
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectModel(Dropdown.name) private readonly dropdownModel: Model<Dropdown>,
    @Inject('TUTOR_FLOW_SERVICE') private readonly tutorFlowClient: ClientProxy, // ✅ updated
  ) {}

  // 🔹 Fetch modules & dropdowns only for a specific pipeline name (case insensitive)
  async getModulesWithDropdownsByPipeline(
    pipelineName: string,
  ): Promise<ModuleWithDropdowns[]> {
    const pipeline = await this.pipelineModel
      .findOne({ name: new RegExp(`^${pipelineName}$`, 'i') })
      .lean();

    if (!pipeline) {
      return [];
    }

    const modules = await this.moduleModel
      .find({ pipelineId: pipeline._id })
      .lean();

    const result: ModuleWithDropdowns[] = [];

    for (const m of modules) {
      const dropdowns = await this.dropdownModel
        .find({ moduleId: m._id, status: 'Active' }) // only Active
        .lean();

      result.push({
        moduleName: m.name,
        pipelineName,
        dropdowns: dropdowns.map((d) => ({
          dropdownName: d.name,
          options: (d.options || [])
            .filter((opt: any) => opt.enabled) // only enabled
            .map((opt: any) => opt.value), // only string values
        })),
      });
    }

    return result;
  }

  // 🔹 Send tutor flow modules
  // async sendTutorFlowModules() {
  //   const data = await this.getModulesWithDropdownsByPipeline('tutor flow');
  //   console.log('Publishing to RabbitMQ with payload:', JSON.stringify(data));
  //   return this.tutorFlowClient.emit(
  //     { cmd: 'received-tutorflow-modules-with-dropdowns' },
  //     data,
  //   );
  // }

  // 🔹 Send tutor flow modules
  async sendTutorFlowModules(pipeline: string) {
    const normalizedPipeline = pipeline.toLowerCase();
    const data =
      await this.getModulesWithDropdownsByPipeline(normalizedPipeline);
    console.log(
      `Publishing ${pipeline} modules to RabbitMQ with payload:`,
      JSON.stringify(data),
    );

    if (normalizedPipeline === 'tutor flow') {
      return this.tutorFlowClient.emit(
        { cmd: 'received-tutorflow-modules-with-dropdowns' },
        data,
      );
    } else {
      throw new Error(`Invalid pipeline: ${pipeline}`);
    }
  }
}
