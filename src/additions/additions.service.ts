import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdditionDto } from './dto/create-addition.dto';
import { Addition } from './entities/additions.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AdditionsService {
  constructor(
    @InjectRepository(Addition)
    private additionsRepository: Repository<Addition>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAddition(createAdditionDto: CreateAdditionDto, userId: string) {
    // Check user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Użytkownik nie znaleziony');
    }

    // Create new Addition
    const newAddition = this.additionsRepository.create({
      ...createAdditionDto,
      user, // connect user object
    });

    // save to database
    return this.additionsRepository.save(newAddition);
  }

  async findAllByUser(userId: string) {
    return this.additionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const addition = await this.additionsRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!addition) {
      throw new NotFoundException('Dodatek nie znaleziony');
    }

    return addition;
  }

  async remove(id: string, userId: string) {
    const addition = await this.findOne(id, userId);
    return this.additionsRepository.remove(addition);
  }
}
