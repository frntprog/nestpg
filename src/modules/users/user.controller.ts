import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      return await this.userService.getUserByID(id);
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const res = await this.userService.create(createUserDto);
    console.log(res);
    return res;
  }
}
