import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OnboardingService } from './onboarding.service';
import { OnboardingStepStatus } from './schemas/onboarding-progress.schema';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('stats')
  getStats() {
    return this.onboardingService.getOnboardingStats();
  }

  @Get('list')
  getList(@Query() filters: any) {
    return this.onboardingService.getEmployeeOnboardingList(filters);
  }

  @Get(':employeeId')
  getProgress(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getProgress(employeeId);
  }

  @Patch(':employeeId/step/:stepId')
  updateStepStatus(
    @Param('employeeId') employeeId: string,
    @Param('stepId') stepId: string,
    @Body() body: {
      status: OnboardingStepStatus;
      formData?: any;
      notes?: string;
    }
  ) {
    return this.onboardingService.updateStepStatus(
      employeeId,
      stepId,
      body.status,
      body.formData,
      body.notes
    );
  }

  @Post(':employeeId/custom-step')
  addCustomStep(
    @Param('employeeId') employeeId: string,
    @Body() stepData: any
  ) {
    return this.onboardingService.addCustomStep(employeeId, stepData);
  }

  @Patch(':employeeId/assign-buddy')
  assignBuddy(
    @Param('employeeId') employeeId: string,
    @Body() body: { buddyId: string }
  ) {
    return this.onboardingService.assignBuddy(employeeId, body.buddyId);
  }

  @Patch(':employeeId/assign-hr')
  assignHR(
    @Param('employeeId') employeeId: string,
    @Body() body: { hrId: string }
  ) {
    return this.onboardingService.assignHR(employeeId, body.hrId);
  }

  @Post(':employeeId/document')
  addDocument(
    @Param('employeeId') employeeId: string,
    @Body() documentData: any
  ) {
    return this.onboardingService.addDocument(employeeId, documentData);
  }

  @Patch(':employeeId/document/:documentId')
  updateDocumentStatus(
    @Param('employeeId') employeeId: string,
    @Param('documentId') documentId: string,
    @Body() body: { status: 'pending' | 'reviewed' | 'signed' }
  ) {
    return this.onboardingService.updateDocumentStatus(
      employeeId,
      documentId,
      body.status
    );
  }

  @Post(':employeeId/meeting')
  scheduleMeeting(
    @Param('employeeId') employeeId: string,
    @Body() meetingData: any
  ) {
    return this.onboardingService.scheduleMeeting(employeeId, meetingData);
  }

  @Post(':employeeId/feedback')
  submitFeedback(
    @Param('employeeId') employeeId: string,
    @Body() feedback: any
  ) {
    return this.onboardingService.submitFeedback(employeeId, feedback);
  }

  @Post(':employeeId/step/:stepId/feedback')
  submitStepFeedback(
    @Param('employeeId') employeeId: string,
    @Param('stepId') stepId: string,
    @Body() feedback: { rating: number; comment: string }
  ) {
    return this.onboardingService.submitStepFeedback(employeeId, stepId, feedback);
  }
}