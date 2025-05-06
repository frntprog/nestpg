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
    createTaskDto: CreateTaskDto & { userId: string },
  ): Promise<Task> {
    const { groupId, ...rest } = createTaskDto;
    const newTask = this.taskRepository.create({
      ...rest,
      group: groupId ? { id: groupId } : undefined, // attach relation if provided
    });
    console.log('newTask', newTask);

    return await this.taskRepository.save(newTask); // Save to DB
  }

  async getTaskByID(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'group'], // ← add group if needed
    });

    if (!task) {
      throw new BadRequestException('Task does not exist');
    }

    return task;
  }

  // async assignToGroup(taskId: string, groupId: string): Promise<Task> {
  //   const task = await this.getTaskByID(taskId);
  //   if (!task) {
  //     throw new BadRequestException('Task not found');
  //   }

  //   task.group = { id: groupId } as any; // cast to avoid full object fetch
  //   return await this.taskRepository.save(task);
  // }

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
