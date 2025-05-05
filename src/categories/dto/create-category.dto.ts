import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateCategoryDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
