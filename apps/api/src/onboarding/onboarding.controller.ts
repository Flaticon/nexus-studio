import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateTenantDto } from '../tenant/dto/tenant.dto';

@Controller('api/onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post('create-tenant')
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.onboardingService.createTenantWithOnboarding(createTenantDto);
  }

  @Post('validate-subdomain')
  async validateSubdomain(@Body() body: { subdomain: string }) {
    return this.onboardingService.validateSubdomain(body.subdomain);
  }

  @Get('pricing')
  getPricing() {
    return this.onboardingService.getPricingPlans();
  }
}