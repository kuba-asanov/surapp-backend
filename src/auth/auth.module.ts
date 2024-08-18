import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './gurads/auth.guard';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtModuleOptions)],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
