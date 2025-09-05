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
  UseGuards,
  Request
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { PortfolioFilterDto } from './dto/portfolio-filter.dto';
import { AddDocumentDto } from './dto/add-document.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('api/portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // CRUD Operations
  @Post('startups')
  create(@Body() createStartupDto: CreateStartupDto) {
    return this.portfolioService.create(createStartupDto);
  }

  @Get('startups')
  findAll(@Query() filters: PortfolioFilterDto) {
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

  @Delete('startups/:id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }

  // Stage Management
  @Post('startups/:id/next-stage')
  moveToNextStage(
    @Param('id') id: string, 
    @Body('milestone') milestone?: string
  ) {
    return this.portfolioService.moveToNextStage(id, milestone);
  }

  // Document Management
  @Post('startups/:id/documents')
  addDocument(
    @Param('id') id: string,
    @Body() documentDto: AddDocumentDto
  ) {
    return this.portfolioService.addDocument(id, documentDto);
  }

  // Metrics Management
  @Post('startups/:id/metrics')
  updateMetrics(
    @Param('id') id: string,
    @Body() metrics: any[]
  ) {
    return this.portfolioService.updateMetrics(id, metrics);
  }

  // Milestones
  @Post('startups/:id/milestones')
  addMilestone(
    @Param('id') id: string,
    @Body() milestone: any
  ) {
    return this.portfolioService.addMilestone(id, milestone);
  }

  @Patch('startups/:id/milestones/:index/complete')
  completeMilestone(
    @Param('id') id: string,
    @Param('index') index: number
  ) {
    return this.portfolioService.completeMilestone(id, index);
  }

  // Views
  @Get('pipeline')
  getPipelineView() {
    return this.portfolioService.getPipelineView();
  }

  @Get('statistics')
  getStatistics() {
    return this.portfolioService.getStatistics();
  }

  @Get('activity')
  getActivityLog(@Query('startupId') startupId?: string) {
    return this.portfolioService.getActivityLog(startupId);
  }

  // Comparisons
  @Post('compare')
  compareStartups(@Body('startupIds') startupIds: string[]) {
    return this.portfolioService.compareStartups(startupIds);
  }

  @Post('comparisons/save')
  saveComparison(
    @Body('name') name: string,
    @Body('startupIds') startupIds: string[],
    @Body('metrics') metrics: string[],
    @Request() req: any
  ) {
    return this.portfolioService.saveComparison(
      name, 
      startupIds, 
      metrics, 
      req.user.id
    );
  }

  @Get('comparisons')
  getSavedComparisons(@Request() req: any) {
    return this.portfolioService.getSavedComparisons(req.user.id);
  }
}