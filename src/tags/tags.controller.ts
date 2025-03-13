import {
  Controller,
  HttpCode,
  Post,
  Body,
  HttpStatus,
  Request,
  Param,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { EditTagDto } from './dto/edit-tag.dto';

@Controller('tag')
export class TagsController {
  constructor(private tagService: TagsService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createTag(@Body() createTagDto: CreateTagDto, @Request() req) {
    const userId = req.user.sub;
    return this.tagService.createTag(createTagDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllTags(@Request() req) {
    const userId = req.user.sub;
    return this.tagService.showAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateTag(@Param('id') id: string, @Body() editTagDto: EditTagDto) {
    return this.tagService.updateTag(id, editTagDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.deleteTag(id);
  }
}
