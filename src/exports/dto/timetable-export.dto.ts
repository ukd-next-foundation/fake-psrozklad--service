import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class TimetableExportDto {
  @IsOptional()
  @IsIn(['json'])
  req_format?: 'json';

  @IsOptional()
  @IsIn(['UTF8'])
  coding_mode?: 'UTF8';

  @IsOptional()
  @IsIn(['group', 'teacher', 'room'])
  req_mode?: 'group' | 'teacher' | 'room';

  @IsOptional()
  @IsIn(['obj_list', 'rozklad'])
  req_type?: 'obj_list' | 'rozklad';

  @IsOptional()
  @Transform(({ value }) => value === 'yes')
  show_ID?: boolean = false;

  @IsOptional()
  @IsIn(['ok', ''])
  bs?: 'ok' | '';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => `${value}`.split('.').reverse().join('-'))
  begin_date?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => `${value}`.split('.').reverse().join('-'))
  end_date?: string;

  @IsOptional()
  @IsIn(['separated'])
  ros_text?: 'separated';

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  OBJ_ID?: number;

  @IsOptional()
  @IsString()
  OBJ_name?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'yes')
  all_stream_components?: boolean = false;
}
