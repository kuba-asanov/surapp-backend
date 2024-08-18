import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class RegisterUserDto extends BaseDto {
  @ApiProperty({
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z][a-zA-Z0-9]*$/, {
    message:
      'username should start with a letter and contain only letters and digits',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone?: string;
}
