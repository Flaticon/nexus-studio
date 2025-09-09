import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Employee, EmployeeDocument, EmployeeStatus } from './schemas/employee.schema';
import { OnboardingProgress, OnboardingProgressDocument } from './schemas/onboarding-progress.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(OnboardingProgress.name) private onboardingModel: Model<OnboardingProgressDocument>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if employee with email already exists
    const existingEmployee = await this.employeeModel.findOne({
      email: createEmployeeDto.email,
    });

    if (existingEmployee) {
      throw new ConflictException('Employee with this email already exists');
    }

    // Check if employee ID already exists
    const existingEmployeeId = await this.employeeModel.findOne({
      employeeId: createEmployeeDto.employeeId,
    });

    if (existingEmployeeId) {
      throw new ConflictException('Employee ID already exists');
    }

    const employee = new this.employeeModel(createEmployeeDto);
    const savedEmployee = await employee.save();

    // Create onboarding progress for the new employee
    await this.createOnboardingProgress(savedEmployee._id as Types.ObjectId);

    return savedEmployee;
  }

  async findAll(query?: any): Promise<Employee[]> {
    const filter = { isActive: true, ...query };
    return this.employeeModel
      .find(filter)
      .populate('managerId', 'firstName lastName email position')
      .populate('directReports', 'firstName lastName email position')
      .populate('onboardingProgressId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Employee> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid employee ID');
    }

    const employee = await this.employeeModel
      .findById(id)
      .populate('managerId', 'firstName lastName email position')
      .populate('directReports', 'firstName lastName email position')
      .populate('onboardingProgressId')
      .exec();

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findOne({ email, isActive: true })
      .populate('managerId', 'firstName lastName email position')
      .populate('onboardingProgressId')
      .exec();

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid employee ID');
    }

    const employee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .populate('managerId', 'firstName lastName email position')
      .populate('directReports', 'firstName lastName email position')
      .exec();

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid employee ID');
    }

    const employee = await this.employeeModel.findByIdAndUpdate(
      id,
      { isActive: false, status: EmployeeStatus.TERMINATED },
      { new: true }
    );

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
  }

  async getEmployeesByDepartment(department: string): Promise<Employee[]> {
    return this.employeeModel
      .find({ department, isActive: true })
      .populate('managerId', 'firstName lastName email position')
      .sort({ lastName: 1 })
      .exec();
  }

  async getEmployeesByManager(managerId: string): Promise<Employee[]> {
    if (!Types.ObjectId.isValid(managerId)) {
      throw new NotFoundException('Invalid manager ID');
    }

    return this.employeeModel
      .find({ managerId, isActive: true })
      .populate('managerId', 'firstName lastName email position')
      .sort({ lastName: 1 })
      .exec();
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.employeeModel.findByIdAndUpdate(id, {
      lastLoginAt: new Date(),
    });
  }

  async getEmployeeStats() {
    const totalEmployees = await this.employeeModel.countDocuments({ isActive: true });
    const activeEmployees = await this.employeeModel.countDocuments({
      isActive: true,
      status: EmployeeStatus.ACTIVE,
    });
    
    const departmentStats = await this.employeeModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const roleStats = await this.employeeModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const onboardingStats = await this.employeeModel.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          completed: {
            $sum: { $cond: [{ $eq: ['$onboardingCompleted', true] }, 1, 0] }
          },
          pending: {
            $sum: { $cond: [{ $eq: ['$onboardingCompleted', false] }, 1, 0] }
          }
        }
      }
    ]);

    return {
      totalEmployees,
      activeEmployees,
      departmentStats,
      roleStats,
      onboardingStats: onboardingStats[0] || { completed: 0, pending: 0 },
    };
  }

  private async createOnboardingProgress(employeeId: Types.ObjectId): Promise<void> {
    const defaultSteps = [
      {
        id: 'welcome',
        title: 'Bienvenida a la empresa',
        description: 'Video de bienvenida del CEO y overview de la empresa',
        type: 'video',
        order: 1,
        isRequired: true,
        estimatedDuration: 15,
        resources: [{
          title: 'Video de bienvenida',
          type: 'video',
          url: '/resources/welcome-video',
          description: 'Introducción a nuestra cultura y valores'
        }]
      },
      {
        id: 'personal_info',
        title: 'Completar información personal',
        description: 'Llenar formulario con datos personales y de contacto',
        type: 'form',
        order: 2,
        isRequired: true,
        estimatedDuration: 10,
        resources: [{
          title: 'Formulario de información personal',
          type: 'form',
          url: '/onboarding/personal-info',
          description: 'Datos de contacto y emergencia'
        }]
      },
      {
        id: 'handbook',
        title: 'Leer manual del empleado',
        description: 'Revisar políticas, procedimientos y beneficios',
        type: 'document',
        order: 3,
        isRequired: true,
        estimatedDuration: 45,
        resources: [{
          title: 'Manual del empleado',
          type: 'document',
          url: '/resources/employee-handbook',
          description: 'Políticas y procedimientos de la empresa'
        }]
      },
      {
        id: 'it_setup',
        title: 'Configuración de IT',
        description: 'Configurar cuentas, accesos y herramientas de trabajo',
        type: 'task',
        order: 4,
        isRequired: true,
        estimatedDuration: 30,
        assignedTo: 'it-department',
        resources: [{
          title: 'Guía de configuración IT',
          type: 'document',
          url: '/resources/it-setup-guide',
          description: 'Paso a paso para configurar tu estación de trabajo'
        }]
      },
      {
        id: 'team_meeting',
        title: 'Reunión con el equipo',
        description: 'Conocer a los compañeros de equipo',
        type: 'meeting',
        order: 5,
        isRequired: true,
        estimatedDuration: 60,
        resources: []
      }
    ];

    const onboardingProgress = new this.onboardingModel({
      employeeId,
      startDate: new Date(),
      steps: defaultSteps,
      currentStepId: 'welcome',
      completionPercentage: 0,
    });

    const savedProgress = await onboardingProgress.save();

    // Update employee with onboarding progress reference
    await this.employeeModel.findByIdAndUpdate(employeeId, {
      onboardingProgressId: savedProgress._id,
    });
  }
}