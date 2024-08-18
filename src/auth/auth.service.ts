import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Hash } from 'src/utils/hash';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { IJwtPlayload } from './interfaces/jwt-playload.interfac';
import { IAccessToken } from './interfaces/access-token.interface';
import { ErrorMessages } from 'src/infrastructure/enums/error-messages.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(registerUserDto: RegisterUserDto): Promise<User> {
    const { password } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    registerUserDto.password = hashedPassword;

    const createdUser = await this.usersService.createUser(registerUserDto);
    createdUser.password = undefined;

    return createdUser;
  }

  async login(loginDto: LoginDto): Promise<IAccessToken> {
    const user = await this.validateUser(loginDto);

    const payload: IJwtPlayload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { username, phone, password } = loginDto;

    const user = await this.usersService.getBy(
      [{ username }, { phone }],
      {},
      false,
    );
    if (!user) {
      throw new UnauthorizedException(
        ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
      );
    }

    if (!Hash.compare(password, user.password)) {
      throw new UnauthorizedException(
        ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
      );
    }

    return user;
  }
}
