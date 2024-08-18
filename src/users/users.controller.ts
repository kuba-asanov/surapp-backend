import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/shared/dto/list-params.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  async getUsers(@Query() listParams: ListParamsDto) {
    return this.usersService.list(listParams);
  }

  @Get(':id')
  @Public()
  async getUserById(@Param('id') id: string) {
    return this.usersService.getBy({ id: parseInt(id) });
  }
}
