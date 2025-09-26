import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto, CheckSubdomainDto } from './dto/tenant.dto';

@Controller('api/tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.tenantService.findAll(page, limit);
  }

  @Get('stats')
  getStats() {
    return this.tenantService.getStats();
  }

  @Post('check-subdomain')
  async checkSubdomain(@Body() checkSubdomainDto: CheckSubdomainDto) {
    const available = await this.tenantService.checkSubdomainAvailable(
      checkSubdomainDto.subdomain
    );
    return { available };
  }

  @Get('subdomain/:subdomain')
  findBySubdomain(@Param('subdomain') subdomain: string) {
    return this.tenantService.findBySubdomain(subdomain);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Patch(':id/usage')
  updateUsage(
    @Param('id') id: string,
    @Body() usage: { venturesCount?: number; usersCount?: number; storageUsed?: number }
  ) {
    return this.tenantService.updateUsage(id, usage);
  }

  @Patch(':id/billing')
  updateBilling(
    @Param('id') id: string,
    @Body() billing: {
      stripeCustomerId?: string;
      stripeSubscriptionId?: string;
      currentPeriodStart?: Date;
      currentPeriodEnd?: Date;
      cancelAtPeriodEnd?: boolean;
    }
  ) {
    return this.tenantService.updateBilling(id, billing);
  }
}