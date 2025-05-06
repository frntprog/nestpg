import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(
    createUserDto: CreateTaskDto & { userId: string },
  ): Promise<Task> {
    const newTask = this.taskRepository.create(createUserDto); // Create entity instance
    console.log('newTask', newTask);

    return await this.taskRepository.save(newTask); // Save to DB
  }

  async getTaskByID(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    const taskByUser = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    console.log('taskByUser', taskByUser);

    if (!task) {
      throw new BadRequestException('User doesnt exist');
    }
    return task;
  }

  async getAllTasks(userId: string): Promise<Task[] | null> {
    const tasks = await this.taskRepository.find({
      where: { userId },
      relations: ['user'],
    });

    return tasks;
  }

  async deleteTaskById(id: string): Promise<boolean> {
    await this.getTaskByID(id);

    await this.taskRepository.delete({ id });

    return true;
  }
}
