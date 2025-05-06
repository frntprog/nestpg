import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'adsad34fw*asd',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController],
})
export class UsersModule {}
