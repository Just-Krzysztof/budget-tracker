import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addition } from './entities/additions.entity';
import { User } from '../users/entities/user.entity';
import { AdditionsService } from './additions.service';
import { AdditionsController } from './additions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Addition, User])],
  controllers: [AdditionsController],
  providers: [AdditionsService],
  exports: [TypeOrmModule],
})
export class AdditionsModule {}
