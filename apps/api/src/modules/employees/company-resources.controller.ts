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
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CompanyResourcesService } from './company-resources.service';
import { ResourceCategory, ResourceType } from './schemas/company-resource.schema';

@Controller('company-resources')
export class CompanyResourcesController {
  constructor(private readonly resourcesService: CompanyResourcesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() resourceData: any) {
    return this.resourcesService.create(resourceData);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.resourcesService.findAll(filters);
  }

  @Get('stats')
  getStats() {
    return this.resourcesService.getResourceStats();
  }

  @Get('search')
  search(@Query('q') searchTerm: string) {
    return this.resourcesService.search(searchTerm);
  }

  @Get('onboarding')
  getOnboardingResources(
    @Query('employeeId') employeeId?: string,
    @Query('department') department?: string,
    @Query('role') role?: string
  ) {
    return this.resourcesService.getOnboardingResources(employeeId, department, role);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: ResourceCategory) {
    return this.resourcesService.findByCategory(category);
  }

  @Get('type/:type')
  findByType(@Param('type') type: ResourceType) {
    return this.resourcesService.findByType(type);
  }

  @Get('role/:role')
  getByRole(@Param('role') role: string) {
    return this.resourcesService.getResourcesByRole([role]);
  }

  @Get('department/:department')
  getByDepartment(@Param('department') department: string) {
    return this.resourcesService.getResourcesByDepartment([department]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.resourcesService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }

  @Post(':id/view')
  incrementView(@Param('id') id: string) {
    return this.resourcesService.incrementViewCount(id);
  }

  @Post(':id/download')
  incrementDownload(@Param('id') id: string) {
    return this.resourcesService.incrementDownloadCount(id);
  }

  @Post('seed')
  seedDefault() {
    return this.resourcesService.createDefaultResources();
  }

  @Post('seed-onboarding')
  seedOnboarding() {
    return this.resourcesService.createOnboardingResources();
  }

  @Get('onboarding/:employeeId/progress')
  getOnboardingProgress(@Param('employeeId') employeeId: string) {
    return this.resourcesService.getResourceProgress(employeeId);
  }

  @Get('onboarding/:employeeId/next')
  getNextOnboardingResource(
    @Param('employeeId') employeeId: string,
    @Query('currentResourceId') currentResourceId?: string
  ) {
    return this.resourcesService.getNextOnboardingResource(employeeId, currentResourceId);
  }

  @Post('onboarding/:employeeId/complete/:resourceId')
  markResourceCompleted(
    @Param('employeeId') employeeId: string,
    @Param('resourceId') resourceId: string,
    @Body() completionData?: any
  ) {
    return this.resourcesService.markResourceAsCompleted(resourceId, employeeId, completionData);
  }
}