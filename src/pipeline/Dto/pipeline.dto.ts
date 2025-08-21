import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PipelineDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsIn(['Active', 'Inactive'], {
  //   message: 'Status must be either "active" or "inactive"',
  // })
  // status?: string;
}
