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
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { AuthGuard } from '../users/auth.guard';

@UseGuards(AuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    try {
      const group = await this.groupService.getGroupByID(id);
      console.log('Group found:', group);
      return group;
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to get group',
      };
    }
  }

  @Post()
  async createTask(
    @Body() createGroupDto: CreateGroupDto,
    @Req() req: Request & { user: Record<string, any> },
  ) {
    console.log('POST');

    const res = await this.groupService.create({
      ...createGroupDto,
      userId: req.user.userId,
    });
    console.log('res', res);
    return res;
  }

  @Get()
  async getAllGroups(@Req() req: Request & { user: Record<string, any> }) {
    try {
      console.log('getAllGroups');

      return await this.groupService.getAllGroups(req.user.userId);
    } catch (error) {
      return error.message;
    }
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') id: string) {
    // try {
    //   return await this.taskService.deleteTaskById(id);
    // } catch (error) {
    //   return error.message;
    // }
  }
}
