import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(registerUserDto: RegisterUserDto): Promise<User> {
    const { password } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    registerUserDto.password = hashedPassword;

    const createdUser = await this.usersService.createUser(registerUserDto);
    createdUser.password = undefined;

    return createdUser;
  }

  async login() {
    return {
      login: true,
    };
  }
}
