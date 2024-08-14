import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.signup(registerUserDto);
  }

  @Post('login')
  async login() {
    return this.authService.login();
  }
}
