import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PostStatus } from 'src/infrastructure/enums/post-status.enum';
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

  @ApiPropertyOptional({
    enum: PostStatus,
    description: 'Filter by post status',
    example: PostStatus.PENDING,
    required: false,
  })
  @IsEnum(PostStatus)
  @Transform(({ value }) => Number(value))
  @IsOptional()
  status?: PostStatus;

  @ApiPropertyOptional({
    description: 'Search term for filtering post content',
    example: 'how to pray',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
