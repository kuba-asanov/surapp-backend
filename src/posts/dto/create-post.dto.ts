import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreatePostDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Recipient ID',
    default: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  recipientId: number;

  @ApiProperty({
    description: 'Array of category IDs',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  categoryIds: number[];
}
