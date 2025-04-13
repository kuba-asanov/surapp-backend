import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/shared/dto/list-params.dto';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  async getUsers(@Query() listParams: ListParamsDto) {
    return this.usersService.list(listParams);
  }

  @Get('reciters')
  @Public()
  async getReciters(@Query() listParams: ListParamsDto) {
    return this.usersService.list(listParams, { role: 1 });
  }

  @Get(':id')
  @Public()
  async getUserById(@Param('id') id: string) {
    return this.usersService.getBy(
      { id: parseInt(id) },
      {
        posts: {
          recipient: true,
        },
        answers: {
          author: true,
        },
      },
    );
  }

  @Patch('update/:userId')
  @Public()
  @ApiOperation({ summary: 'Update a profile' })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(+userId, updateDto);
  }
}
