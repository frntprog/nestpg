import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('registrate')
  async registrateUser(@Body() createUserDto: CreateUserDto) {
    console.log('registrate');

    return await this.authService.registrateUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('login');

    return await this.authService.login(loginDto);
  }
}
