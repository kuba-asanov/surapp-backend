import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { ListParamsDto } from 'src/shared/dto/list-params.dto';

export class PostListParamsDto extends ListParamsDto {
  @ApiProperty({
    description: 'Array of category IDs',
    type: [Number],
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map(Number) : [Number(value)],
  )
  @IsOptional()
  categoryIds?: number[];
}
