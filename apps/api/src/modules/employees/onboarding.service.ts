import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OnboardingProgress, OnboardingProgressDocument, OnboardingStepStatus } from './schemas/onboarding-progress.schema';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectModel(OnboardingProgress.name) private onboardingModel: Model<OnboardingProgressDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async getProgress(employeeId: string): Promise<OnboardingProgress> {
    if (!Types.ObjectId.isValid(employeeId)) {
      throw new NotFoundException('Invalid employee ID');
    }

    const progress = await this.onboardingModel
      .findOne({ employeeId: new Types.ObjectId(employeeId) })
      .populate('assignedHR', 'firstName lastName email')
      .populate('assignedBuddy', 'firstName lastName email')
      .exec();

    if (!progress) {
      throw new NotFoundException('Onboarding progress not found');
    }

    return progress;
  }

  async updateStepStatus(
    employeeId: string,
    stepId: string,
    status: OnboardingStepStatus,
    formData?: any,
    notes?: string
  ): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const stepIndex = progress.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) {
      throw new NotFoundException('Step not found');
    }

    progress.steps[stepIndex].status = status;
    if (formData) {
      progress.steps[stepIndex].formData = formData;
    }
    if (notes) {
      progress.steps[stepIndex].notes = notes;
    }
    if (status === OnboardingStepStatus.COMPLETED) {
      progress.steps[stepIndex].completedAt = new Date();
    }

    // Update completion percentage
    const completedSteps = progress.steps.filter(step => step.status === OnboardingStepStatus.COMPLETED).length;
    progress.completionPercentage = Math.round((completedSteps / progress.steps.length) * 100);

    // Move to next step if current step is completed
    if (status === OnboardingStepStatus.COMPLETED) {
      const nextStepIndex = stepIndex + 1;
      if (nextStepIndex < progress.steps.length) {
        progress.currentStepId = progress.steps[nextStepIndex].id;
        progress.steps[nextStepIndex].status = OnboardingStepStatus.IN_PROGRESS;
      } else {
        // All steps completed
        progress.isCompleted = true;
        progress.completedDate = new Date();
        
        // Update employee onboarding status
        await this.employeeModel.findByIdAndUpdate(employeeId, {
          onboardingCompleted: true,
        });
      }
    }

    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async addCustomStep(employeeId: string, stepData: any): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const customStep = {
      id: `custom_${Date.now()}`,
      title: stepData.title,
      description: stepData.description,
      type: stepData.type,
      status: OnboardingStepStatus.PENDING,
      order: progress.steps.length + 1,
      isRequired: stepData.isRequired || false,
      dueDate: stepData.dueDate,
      completedAt: undefined,
      assignedTo: stepData.assignedTo,
      estimatedDuration: stepData.estimatedDuration || 15,
      resources: stepData.resources || [],
      formData: undefined,
      notes: '',
      feedback: undefined,
    };

    progress.customSteps.push(customStep as any);
    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async assignBuddy(employeeId: string, buddyId: string): Promise<OnboardingProgressDocument> {
    if (!Types.ObjectId.isValid(buddyId)) {
      throw new NotFoundException('Invalid buddy ID');
    }

    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    progress.assignedBuddy = new Types.ObjectId(buddyId);
    
    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async assignHR(employeeId: string, hrId: string): Promise<OnboardingProgressDocument> {
    if (!Types.ObjectId.isValid(hrId)) {
      throw new NotFoundException('Invalid HR ID');
    }

    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    progress.assignedHR = new Types.ObjectId(hrId);
    
    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async addDocument(employeeId: string, documentData: any): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const document = {
      id: `doc_${Date.now()}`,
      name: documentData.name,
      type: documentData.type,
      url: documentData.url,
      status: 'pending' as 'pending' | 'reviewed' | 'signed',
      uploadedAt: new Date(),
      reviewedAt: undefined,
    };

    progress.documents.push(document as any);
    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async updateDocumentStatus(
    employeeId: string,
    documentId: string,
    status: 'pending' | 'reviewed' | 'signed'
  ): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const docIndex = progress.documents.findIndex(doc => doc.id === documentId);
    if (docIndex === -1) {
      throw new NotFoundException('Document not found');
    }

    progress.documents[docIndex].status = status;
    if (status === 'reviewed' || status === 'signed') {
      progress.documents[docIndex].reviewedAt = new Date();
    }

    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async scheduleMeeting(employeeId: string, meetingData: any): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const meeting = {
      id: `meeting_${Date.now()}`,
      title: meetingData.title,
      type: meetingData.type,
      scheduledDate: new Date(meetingData.scheduledDate),
      attendees: meetingData.attendees || [],
      status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled',
      notes: '',
    };

    progress.meetings.push(meeting as any);
    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async submitFeedback(employeeId: string, feedback: any): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    progress.feedback = {
      overallRating: feedback.overallRating,
      comments: feedback.comments,
      suggestions: feedback.suggestions,
      submittedAt: new Date(),
    };

    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async submitStepFeedback(
    employeeId: string,
    stepId: string,
    feedback: { rating: number; comment: string }
  ): Promise<OnboardingProgressDocument> {
    const progress = await this.getProgress(employeeId) as OnboardingProgressDocument;
    
    const stepIndex = progress.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) {
      throw new NotFoundException('Step not found');
    }

    progress.steps[stepIndex].feedback = {
      rating: feedback.rating,
      comment: feedback.comment,
      submittedAt: new Date(),
    };

    const result = await this.onboardingModel.findByIdAndUpdate(progress._id, progress, { new: true }).exec();
    if (!result) {
      throw new NotFoundException('Could not update onboarding progress');
    }
    return result;
  }

  async getOnboardingStats() {
    const totalOnboarding = await this.onboardingModel.countDocuments({ isActive: true });
    const completed = await this.onboardingModel.countDocuments({ isCompleted: true });
    const inProgress = await this.onboardingModel.countDocuments({
      isCompleted: false,
      isActive: true,
    });

    const avgCompletion = await this.onboardingModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgCompletion: { $avg: '$completionPercentage' } } },
    ]);

    const stepStats = await this.onboardingModel.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$steps' },
      {
        $group: {
          _id: '$steps.id',
          title: { $first: '$steps.title' },
          completed: {
            $sum: { $cond: [{ $eq: ['$steps.status', 'completed'] }, 1, 0] }
          },
          total: { $sum: 1 },
          avgDuration: { $avg: '$steps.estimatedDuration' },
        }
      },
      { $sort: { _id: 1 } },
    ]);

    const recentActivity = await this.onboardingModel
      .find({ isActive: true })
      .populate('employeeId', 'firstName lastName email')
      .sort({ updatedAt: -1 })
      .limit(10)
      .exec();

    return {
      totalOnboarding,
      completed,
      inProgress,
      completionRate: totalOnboarding ? Math.round((completed / totalOnboarding) * 100) : 0,
      avgCompletionPercentage: avgCompletion[0]?.avgCompletion || 0,
      stepStats,
      recentActivity,
    };
  }

  async getEmployeeOnboardingList(filters?: any) {
    const query = { isActive: true, ...filters };
    
    return this.onboardingModel
      .find(query)
      .populate('employeeId', 'firstName lastName email department position startDate')
      .populate('assignedHR', 'firstName lastName email')
      .populate('assignedBuddy', 'firstName lastName email')
      .sort({ startDate: -1 })
      .exec();
  }

  async createOnboardingProgress(employeeId: Types.ObjectId): Promise<void> {
    const defaultSteps = [
      {
        id: 'welcome',
        title: 'Bienvenida a la empresa',
        description: 'Video de bienvenida del CEO y overview de la empresa',
        type: 'video',
        status: OnboardingStepStatus.PENDING,
        order: 1,
        isRequired: true,
        dueDate: undefined,
        completedAt: undefined,
        assignedTo: '',
        estimatedDuration: 15,
        resources: [{
          title: 'Video de bienvenida',
          type: 'video',
          url: '/resources/welcome-video',
          description: 'Introducción a nuestra cultura y valores'
        }],
        formData: undefined,
        notes: '',
        feedback: undefined
      },
      {
        id: 'personal_info',
        title: 'Completar información personal',
        description: 'Llenar formulario con datos personales y de contacto',
        type: 'form',
        status: OnboardingStepStatus.PENDING,
        order: 2,
        isRequired: true,
        dueDate: undefined,
        completedAt: undefined,
        assignedTo: '',
        estimatedDuration: 10,
        resources: [{
          title: 'Formulario de información personal',
          type: 'form',
          url: '/onboarding/personal-info',
          description: 'Datos de contacto y emergencia'
        }],
        formData: undefined,
        notes: '',
        feedback: undefined
      },
      {
        id: 'handbook',
        title: 'Leer manual del empleado',
        description: 'Revisar políticas, procedimientos y beneficios',
        type: 'document',
        status: OnboardingStepStatus.PENDING,
        order: 3,
        isRequired: true,
        dueDate: undefined,
        completedAt: undefined,
        assignedTo: '',
        estimatedDuration: 45,
        resources: [{
          title: 'Manual del empleado',
          type: 'document',
          url: '/resources/employee-handbook',
          description: 'Políticas y procedimientos de la empresa'
        }],
        formData: undefined,
        notes: '',
        feedback: undefined
      },
      {
        id: 'it_setup',
        title: 'Configuración de IT',
        description: 'Configurar cuentas, accesos y herramientas de trabajo',
        type: 'task',
        status: OnboardingStepStatus.PENDING,
        order: 4,
        isRequired: true,
        dueDate: undefined,
        completedAt: undefined,
        assignedTo: 'it-department',
        estimatedDuration: 30,
        resources: [{
          title: 'Guía de configuración IT',
          type: 'document',
          url: '/resources/it-setup-guide',
          description: 'Paso a paso para configurar tu estación de trabajo'
        }],
        formData: undefined,
        notes: '',
        feedback: undefined
      },
      {
        id: 'team_meeting',
        title: 'Reunión con el equipo',
        description: 'Conocer a los compañeros de equipo',
        type: 'meeting',
        status: OnboardingStepStatus.PENDING,
        order: 5,
        isRequired: true,
        dueDate: undefined,
        completedAt: undefined,
        assignedTo: '',
        estimatedDuration: 60,
        resources: [],
        formData: undefined,
        notes: '',
        feedback: undefined
      }
    ];

    const onboardingProgress = new this.onboardingModel({
      employeeId,
      startDate: new Date(),
      steps: defaultSteps,
      currentStepId: 'welcome',
      completionPercentage: 0,
      customSteps: [],
      documents: [],
      meetings: [],
    });

    const savedProgress = await onboardingProgress.save();

    // Update employee with onboarding progress reference
    await this.employeeModel.findByIdAndUpdate(employeeId, {
      onboardingProgressId: savedProgress._id,
    });
  }
}