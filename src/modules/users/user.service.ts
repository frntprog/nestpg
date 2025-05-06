import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto); // Create entity instance
    return await this.userRepository.save(newUser); // Save to DB
  }

  async getUserByID(id: string): Promise<User | null> {
    console.log('getUserByID');

    const user = await this.userRepository.findOne({ where: { id } });
    const userTasks = await this.userRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    console.log('userTasks', userTasks);

    if (!user) {
      throw new BadRequestException('User doesnt exist');
    }
    return user;
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new BadRequestException('User doesnt exist');
    }
    return user;
  }
}
