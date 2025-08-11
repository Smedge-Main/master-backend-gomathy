import { MongooseModule } from '@nestjs/mongoose';
import { Dropdown, DropdownSchema } from './Schema/dropdown.schema';
import { DropdownService } from './dropdown.service';
import { DropdownController } from './dropdown.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dropdown.name, schema: DropdownSchema },
    ]),
  ],
  providers: [DropdownService],
  controllers: [DropdownController],
})
export class DropdownModule {}
