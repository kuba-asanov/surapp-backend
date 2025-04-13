import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class CreateUserDto extends BaseDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone?: string;
}
