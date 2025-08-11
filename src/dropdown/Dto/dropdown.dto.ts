import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateDropdownDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  options: string[];

  @IsMongoId()
  moduleId: string; // This will come from param or body
}
