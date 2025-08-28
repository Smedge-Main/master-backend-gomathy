import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dropdown } from 'src/dropdown/Schema/dropdown.schema';
import { Module } from 'src/module/Schema/module.schema';
import { Pipeline } from 'src/pipeline/Schema/pipeline.schema';

interface DropdownData {
  dropdownName: string;
  options: string[];
}

interface ModuleWithDropdowns {
  moduleName?: string;
  pipelineName?: string;
  dropdowns: DropdownData[];
}

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('COLLEGE_ADMIN_SERVICE')
    private readonly collegeAdminClient: ClientProxy,
    @InjectModel(Dropdown.name) private dropdownModel: Model<Dropdown>,
    @InjectModel(Module.name) private moduleModel: Model<Module>,
    @InjectModel(Pipeline.name) private pipelineModel: Model<Pipeline>,
  ) {}

  // // 🔹 Fetch all modules with dropdowns + pipeline name
  // async getModulesWithDropdowns(): Promise<ModuleWithDropdowns[]> {
  //   const modules = await this.moduleModel.find().lean();
  //   const result: ModuleWithDropdowns[] = [];

  //   for (const m of modules) {
  //     const dropdowns = await this.dropdownModel
  //       .find({ moduleId: m._id, status: 'Active' }) // only Active dropdowns
  //       .lean();

  //     // get pipeline name for each module
  //     let pipelineName = '';
  //     if (m.pipelineId) {
  //       const pipeline = await this.pipelineModel.findById(m.pipelineId).lean();
  //       pipelineName = pipeline?.name ?? '';
  //     }

  //     result.push({
  //       moduleName: m.name,
  //       pipelineName,
  //       dropdowns: dropdowns.map((d) => ({
  //         dropdownName: d.name,
  //         options: (d.options || [])
  //           .filter((opt: any) => opt.enabled) // only enabled
  //           .map((opt: any) => opt.value), // only string values
  //       })),
  //     });
  //   }

  //   return result;
  // }

  // // 🔹 Send all modules with dropdowns (no filter)
  // async sendModulesWithDropdowns() {
  //   const data = await this.getModulesWithDropdowns();
  //   return this.collegeAdminClient.send(
  //     { cmd: 'receive-modules-with-dropdowns' },
  //     data,
  //   );
  // }

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

  // 🔹 Send college admin modules only
  async sendCollegeAdminModules() {
    const data = await this.getModulesWithDropdownsByPipeline('college admin');
    console.log('Publishing to RabbitMQ with payload:', JSON.stringify(data));
    return this.collegeAdminClient.send(
      { cmd: 'receive-modules-with-dropdowns' },
      data,
    );
  }
}
