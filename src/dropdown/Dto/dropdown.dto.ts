// import {
//   IsArray,
//   IsBoolean,
//   IsMongoId,
//   IsNotEmpty,
//   IsString,
// } from 'class-validator';

// export class CreateDropdownDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsArray()
//   @IsNotEmpty()
//   options: string[];

//   @IsBoolean()
//   enabled: boolean;

//   @IsMongoId()
//   moduleId: string; // This will come from param or body
// }

// create-dropdown.dto.ts
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DropdownOptionDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  enabled: boolean;
}

export class CreateDropdownDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DropdownOptionDto)
  options: DropdownOptionDto[];

  @IsBoolean()
  enabled: boolean;

  @IsMongoId()
  moduleId: string;
}
