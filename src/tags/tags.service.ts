import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tags } from './entities/tags.entity';
import { User } from '../users/entities/user.entity';
import { EditTagDto } from './dto/edit-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private tagsRepository: Repository<Tags>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createTag(createTagDto: CreateTagDto, userId: string) {
    //   Check user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // create new tag
    const newTag = this.tagsRepository.create({
      ...createTagDto,
      user, //connect user object
    });

    return this.tagsRepository.save(newTag);
  }

  async showAllByUser(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all user tags using relations
    return this.tagsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }, // sort from newest
    });
  }

  async updateTag(id: string, editTagDto: EditTagDto) {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    await this.tagsRepository.update(id, editTagDto);

    const updatedTag = await this.tagsRepository.findOne({ where: { id } });
    return updatedTag;
  }

  async deleteTag(id: string) {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    await this.tagsRepository.delete(id);

    return {
      status: 'success',
      message: 'Tag was deleted successfully',
    };
  }
}
