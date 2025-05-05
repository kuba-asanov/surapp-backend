import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/infrastructure/enums/user-role.enum';
import { BaseDto } from 'src/shared/dto/base.dto';

export class UpdateUserDto extends BaseDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({ enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    example: '+996553404407',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\+[1-9]\d{1,14}$/)
  phone?: string;
}
