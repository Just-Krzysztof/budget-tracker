import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SummaryService } from './summary.service';
import { SummaryResponseDto } from './dto/summary-response.dto';

@Controller('summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @UseGuards(AuthGuard)
  @Get('monthly')
  async getMonthlySummary(
    @Request() req,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
  ): Promise<SummaryResponseDto> {
    const userId = req.user.sub;
    return this.summaryService.getMonthlySummary(userId, year, month);
  }

  @UseGuards(AuthGuard)
  @Get('yearly')
  async getYearlySummary(
    @Request() req,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<SummaryResponseDto> {
    const userId = req.user.sub;
    return this.summaryService.getYearlySummary(userId, year);
  }

  // You can add more endpoints, e.g. for detailed summaries
}
