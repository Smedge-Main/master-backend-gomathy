// import { Module } from '@nestjs/common';
// import { ModuleController } from './module.controller';
// import { ModuleService } from './module.service';

// @Module({
//   controllers: [ModuleController],
//   providers: [ModuleService]
// })
// export class ModuleModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Module as ModuleSchema,
  ModuleSchema as Schema,
} from './Schema/module.schema';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { Pipeline, PipelineSchema } from 'src/pipeline/Schema/pipeline.schema';
import { Dropdown, DropdownSchema } from 'src/dropdown/Schema/dropdown.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleSchema.name, schema: Schema }]),
    MongooseModule.forFeature([
      { name: Pipeline.name, schema: PipelineSchema },
    ]),
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownSchema },
    ]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
