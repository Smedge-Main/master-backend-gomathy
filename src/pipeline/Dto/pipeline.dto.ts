import { Optional } from '@nestjs/common';
import { IsEmpty, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class PipelineDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be either "active" or "inactive"',
  })
  status?: string;
}
