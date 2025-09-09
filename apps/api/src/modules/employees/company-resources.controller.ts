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
@UseGuards(JwtAuthGuard)
export class CompanyResourcesController {
  constructor(private readonly resourcesService: CompanyResourcesService) {}

  @Post()
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
  getOnboardingResources() {
    return this.resourcesService.getOnboardingResources();
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
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.resourcesService.update(id, updateData);
  }

  @Delete(':id')
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
}