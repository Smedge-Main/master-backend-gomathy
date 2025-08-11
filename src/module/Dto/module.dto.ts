import { IsIn, IsOptional } from 'class-validator';

export class ModuleDto {
  // @IsOptional()
  // pipeline?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be either "active" or "inactive"',
  })
  status?: string;
}
