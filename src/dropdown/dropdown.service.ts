import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Dropdown } from './Schema/dropdown.schema';
import { CreateDropdownDto } from './Dto/dropdown.dto';

@Injectable()
export class DropdownService {
  constructor(
    @InjectModel(Dropdown.name) private dropdownModel: Model<Dropdown>,
  ) {}

  async create(moduleId: string, dto: CreateDropdownDto): Promise<Dropdown> {
    const newDropdown = new this.dropdownModel({
      ...dto,
      moduleId: new mongoose.Types.ObjectId(moduleId),
    });
    return newDropdown.save();
  }

  async findByModule(moduleId: string): Promise<Dropdown[]> {
    return this.dropdownModel
      .find({ moduleId: new mongoose.Types.ObjectId(moduleId) })
      .exec();
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
