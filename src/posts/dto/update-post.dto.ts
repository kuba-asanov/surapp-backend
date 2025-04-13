import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
}
