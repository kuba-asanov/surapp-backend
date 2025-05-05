import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ListParamsDto } from 'src/shared/dto/list-params.dto';

export class UserListParamsDto extends ListParamsDto {
  @ApiPropertyOptional({
    description: 'Search term for filtering reciters',
    example: 'Reciter',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
