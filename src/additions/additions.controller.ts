import { AuthGuard } from '../auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AdditionsService } from './additions.service';
import { CreateAdditionDto } from './dto/create-addition.dto';
// import { UpdateAdditionDto } from './dto/update-addition.dto';

@Controller('additions')
export class AdditionsController {
  constructor(private additionsService: AdditionsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createAddition(@Body() createAdditionDto: CreateAdditionDto, @Request() req) {
    const userId = req.user.sub; // Pobierz ID użytkownika z tokenu JWT
    return this.additionsService.createAddition(createAdditionDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.additionsService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.additionsService.findOne(id, userId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.additionsService.remove(id, userId);
  }
}
