import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../users/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      return await this.taskService.getTaskByID(id);
    } catch (error) {
      return error.message;
    }
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: Record<string, any> },
  ) {
    const res = await this.taskService.create({
      ...createTaskDto,
      userId: req.user.userId,
    });
    console.log(res);
    return res;
  }

  @Get()
  async getAllTasks(@Req() req: Request & { user: Record<string, any> }) {
    try {
      return await this.taskService.getAllTasks(req.user.userId);
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTaskById(id);
    } catch (error) {
      return error.message;
    }
  }
}
