import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entities/tags.entity';
import { User } from '../users/entities/user.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tags, User])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TypeOrmModule],
})
export class TagsModule {}
