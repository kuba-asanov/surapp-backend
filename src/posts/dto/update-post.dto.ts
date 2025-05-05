import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class UpdatePostDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'Recipient ID',
    default: 5,
  })
  @IsNumber()
  @IsOptional()
  recipientId?: number;

  @ApiProperty({
    description: 'Array of category IDs',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsOptional()
  categoryIds?: number[];
}
