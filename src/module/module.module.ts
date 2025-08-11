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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleSchema.name, schema: Schema }]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
