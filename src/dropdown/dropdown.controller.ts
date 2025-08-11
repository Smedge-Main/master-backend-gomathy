import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DropdownService } from './dropdown.service';
import { CreateDropdownDto } from './Dto/dropdown.dto';
import { Dropdown } from './Schema/dropdown.schema';

@Controller('dropdown')
export class DropdownController {
  constructor(private readonly dropdownService: DropdownService) {}

  @Post(':moduleId')
  create(
    @Param('moduleId') moduleId: string,
    @Body() createDropdownDto: CreateDropdownDto,
  ): Promise<Dropdown> {
    return this.dropdownService.create(moduleId, createDropdownDto);
  }

  @Get('module/:moduleId')
  findAll(@Param('moduleId') moduleId: string): Promise<Dropdown[]> {
    return this.dropdownService.findByModule(moduleId);
  }

  @Patch(':id')
  async updatedropdown(
    @Param('id') id: string,
    @Body() CreateDropdownDto: CreateDropdownDto,
  ): Promise<Dropdown> {
    return this.dropdownService.UpdateDropdown(id, CreateDropdownDto);
  }

  @Delete(':id')
  async deletedropdown(@Param('id') id: string): Promise<Dropdown | null> {
    return this.dropdownService.deletedropdown(id);
  }
}
