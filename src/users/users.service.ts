import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<User> {
    // check if user with this email already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Email już istnieje w systemie');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // create and save new user
    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async updateProfile(
    userId: string,
    userData: Partial<Omit<User, 'id' | 'password'>>,
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Użytkownik nie znaleziony');
    }

    Object.assign(user, userData);
    return this.usersRepository.save(user);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Użytkownik nie znaleziony');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('Nieprawidłowe obecne hasło');
    }

    // hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.save(user);
  }
}
