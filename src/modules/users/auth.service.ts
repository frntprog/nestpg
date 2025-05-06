import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registrateUser(createUserDto: CreateUserDto) {
    console.log('in');

    return await this.userService.create(createUserDto);
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmailAndPassword(
      email,
      password,
    );

    return {
      access_token: await this.jwtService.signAsync({ userId: user.id }),
    };
  }
}
