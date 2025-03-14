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
  Put,
} from '@nestjs/common';
import { FinancialRecordsService } from './financialRecords.service';
import { CreateFinancialRecordDto } from './dto/create-financialRecords.dto';
import { UpdateFinancialRecordDto } from './dto/update-financialRecords.dto';

@Controller('financialRecords')
export class FinancialRecordsController {
  constructor(private financialRecordsService: FinancialRecordsService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createFinancialRecord(
    @Body() createFinancialRecordDto: CreateFinancialRecordDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.financialRecordsService.createFinancialRecord(
      createFinancialRecordDto,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.financialRecordsService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.financialRecordsService.findOne(id, userId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.financialRecordsService.remove(id, userId);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialRecordDto: UpdateFinancialRecordDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.financialRecordsService.update(
      id,
      updateFinancialRecordDto,
      userId,
    );
  }
}
