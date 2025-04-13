import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class AnswerPostDto extends BaseDto {
  @ApiProperty({
    example: 'Answer to a question',
  })
  @IsString()
  @IsOptional()
  answer: string;
}
