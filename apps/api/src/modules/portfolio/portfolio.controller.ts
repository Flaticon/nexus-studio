// apps/api/src/modules/portfolio/portfolio.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  UseGuards 
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('startups')
  create(@Body() createStartupDto: CreateStartupDto) {
    return this.portfolioService.create(createStartupDto);
  }

  @Get('startups')
  findAll(@Query() filters: any) {
    return this.portfolioService.findAll(filters);
  }

  @Get('startups/:id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch('startups/:id')
  update(@Param('id') id: string, @Body() updateStartupDto: UpdateStartupDto) {
    return this.portfolioService.update(id, updateStartupDto);
  }

  @Post('startups/:id/kpis')
  updateKPIs(@Param('id') id: string, @Body() kpis: any[]) {
    return this.portfolioService.updateKPIs(id, kpis);
  }

  @Delete('startups/:id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}