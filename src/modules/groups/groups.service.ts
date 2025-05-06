import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskGroup } from './task-group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(TaskGroup)
    private readonly groupRepository: Repository<TaskGroup>,
  ) {}

  async create(
    createGroupDto: CreateGroupDto & { userId: string },
  ): Promise<TaskGroup> {
    const newGroup = this.groupRepository.create(createGroupDto); // Create entity instance
    console.log('newGroups', newGroup);

    return await this.groupRepository.save(newGroup); // Save to DB
  }

  async getGroupByID(id: string): Promise<TaskGroup | null> {
    console.log('getGroupByID called with id:', id);

    try {
      const group = await this.groupRepository.findOne({ where: { id } });
      console.log('Group found:', group);

      if (!group) {
        throw new NotFoundException('Group not found');
      }
      return group;
    } catch (error) {
      console.error('Error in getGroupByID:', error);
      throw error;
    }
  }

  async getAllGroups(userId: string): Promise<TaskGroup[] | null> {
    const groups = await this.groupRepository.find({
      where: { userId },
      relations: ['tasks'],
    });

    return groups;
  }

  async deleteGroupById(id: string): Promise<boolean> {
    await this.getGroupByID(id);

    await this.groupRepository.delete({ id });

    return true;
  }
}
