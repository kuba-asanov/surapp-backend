import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
}
