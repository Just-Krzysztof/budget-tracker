import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFinancialRecordDto } from './dto/create-financialRecords.dto';
import { FinancialRecord } from './entities/financialRecords.entity';
import { User } from '../users/entities/user.entity';
import { UpdateFinancialRecordDto } from './dto/update-financialRecords.dto';

@Injectable()
export class FinancialRecordsService {
  constructor(
    @InjectRepository(FinancialRecord)
    private financialRecordsRepository: Repository<FinancialRecord>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createFinancialRecord(
    createFinancialRecordDto: CreateFinancialRecordDto,
    userId: string,
  ) {
    // Check user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Użytkownik nie znaleziony');
    }

    const newFinancialRecord = this.financialRecordsRepository.create({
      ...createFinancialRecordDto,
      user, // connect user object
    });

    // save to database
    return this.financialRecordsRepository.save(newFinancialRecord);
  }

  async findAllByUser(userId: string) {
    return this.financialRecordsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const financialRecord = await this.financialRecordsRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!financialRecord) {
      throw new NotFoundException('Dodatek nie znaleziony');
    }

    return financialRecord;
  }

  async remove(id: string, userId: string) {
    const financialRecord = await this.findOne(id, userId);
    return this.financialRecordsRepository.remove(financialRecord);
  }

  async update(
    id: string,
    updateFinancialRecordDto: UpdateFinancialRecordDto,
    userId: string,
  ) {
    const financialRecord = await this.findOne(id, userId);
    if (!financialRecord) {
      throw new NotFoundException('Dodatek nie znaleziony');
    }

    await this.financialRecordsRepository.update(id, updateFinancialRecordDto);

    const updatedFinancialRecord = await this.findOne(id, userId);
    return updatedFinancialRecord;
  }
}
