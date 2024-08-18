import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'nursultan',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'a12345',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  phone: string;
}
