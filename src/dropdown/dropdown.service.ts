import {
  Injectable,
  InternalServerErrorException,
  Module,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema, Types } from 'mongoose';
import { Dropdown } from './Schema/dropdown.schema';
import { CreateDropdownDto } from './Dto/dropdown.dto';
import { ModuleDocument, ModuleSchema } from 'src/module/Schema/module.schema';

@Injectable()
export class DropdownService {
  constructor(
    @InjectModel(Dropdown.name) private dropdownModel: Model<Dropdown>,
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async create(moduleId: string, dto: CreateDropdownDto): Promise<Dropdown> {
    const _id = new mongoose.Types.ObjectId(moduleId);

    // Increment dropdown count in the Module collection
    const dropdown = await this.moduleModel.findByIdAndUpdate(
      _id,
      { $inc: { noOfdropdown: 1 } },
      { new: true },
    );
    console.log('Module after increment:', dropdown);

    if (!dropdown) throw new NotFoundException("Can't able to find dropdown");
    // Save the new dropdown
    const newDropdown = new this.dropdownModel({
      ...dto,
      moduleId: _id,
    });
    if (!newDropdown)
      throw new InternalServerErrorException("Can't able to create module");
    console.log('dropdown', dropdown);
    console.log('newDropdown', newDropdown);
    return newDropdown.save();
  }

  // async findByModule(moduleId: string): Promise<Dropdown[]> {
  //   const dropdown = await this.dropdownModel
  //     .find({ moduleId: new mongoose.Types.ObjectId(moduleId) })
  //     .exec();

  //   if (!dropdown) throw new NotFoundException('modules not found');

  //   return dropdown;
  // }

  async findByModule(moduleId: string): Promise<any[]> {
    const dropdowns = await this.dropdownModel
      .find({ moduleId: new mongoose.Types.ObjectId(moduleId) })
      .exec();

    if (!dropdowns || dropdowns.length === 0) {
      throw new NotFoundException('modules not found');
    }

    return dropdowns.map((d) => {
      const obj = d.toObject();
      return {
        ...obj,
        createdon: obj.createdon
          ? new Date(obj.createdon).toLocaleDateString('en-GB')
          : '',
        createdby: obj.createdby || 'Admin',
        status: obj.status || 'Active',
      };
    });
  }

  async UpdateDropdown(
    id: string,
    CreateDropdownDto: CreateDropdownDto,
  ): Promise<Dropdown> {
    const updateddropdown = await this.dropdownModel.findByIdAndUpdate(
      id,
      CreateDropdownDto,
      { new: true },
    );
    if (!updateddropdown)
      throw new NotFoundException(`Dropdown with this ${id} is not found`);
    return updateddropdown;
  }

  async deletedropdown(id: string): Promise<Dropdown | null> {
    const deletedropdown = this.dropdownModel.findOneAndDelete({ _id: id });
    return deletedropdown;
  }
}
