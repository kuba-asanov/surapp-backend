import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class UpdateCategoryDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}
