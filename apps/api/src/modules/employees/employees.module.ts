import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { CompanyResourcesService } from './company-resources.service';
import { CompanyResourcesController } from './company-resources.controller';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { OnboardingProgress, OnboardingProgressSchema } from './schemas/onboarding-progress.schema';
import { CompanyResource, CompanyResourceSchema } from './schemas/company-resource.schema';
import { ResourceProgress, ResourceProgressSchema } from './schemas/resource-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: OnboardingProgress.name, schema: OnboardingProgressSchema },
      { name: CompanyResource.name, schema: CompanyResourceSchema },
      { name: ResourceProgress.name, schema: ResourceProgressSchema },
    ]),
  ],
  controllers: [
    EmployeesController,
    OnboardingController,
    CompanyResourcesController,
  ],
  providers: [
    EmployeesService,
    OnboardingService,
    CompanyResourcesService,
  ],
  exports: [
    EmployeesService,
    OnboardingService,
    CompanyResourcesService,
  ],
})
export class EmployeesModule {}