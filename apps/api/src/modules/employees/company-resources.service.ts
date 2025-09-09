import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CompanyResource, CompanyResourceDocument, ResourceCategory, ResourceType } from './schemas/company-resource.schema';

@Injectable()
export class CompanyResourcesService {
  constructor(
    @InjectModel(CompanyResource.name) private resourceModel: Model<CompanyResourceDocument>,
  ) {}

  async create(resourceData: any): Promise<CompanyResource> {
    const resource = new this.resourceModel(resourceData);
    return resource.save();
  }

  async findAll(filters?: any): Promise<CompanyResource[]> {
    const query = { isActive: true, ...filters };
    return this.resourceModel
      .find(query)
      .sort({ category: 1, order: 1 })
      .exec();
  }

  async findByCategory(category: ResourceCategory): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({ category, isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findByType(type: ResourceType): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({ type, isActive: true })
      .sort({ category: 1, order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<CompanyResource> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid resource ID');
    }

    const resource = await this.resourceModel.findById(id).exec();
    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Increment view count
    await this.incrementViewCount(id);

    return resource;
  }

  async update(id: string, updateData: any): Promise<CompanyResource> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid resource ID');
    }

    const resource = await this.resourceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return resource;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid resource ID');
    }

    const resource = await this.resourceModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }
  }

  async search(searchTerm: string): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({
        isActive: true,
        $text: { $search: searchTerm }
      })
      .sort({ score: { $meta: 'textScore' } })
      .exec();
  }

  async getResourcesByRole(roles: string[]): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({
        isActive: true,
        $or: [
          { applicableRoles: { $in: roles } },
          { applicableRoles: { $size: 0 } } // Resources without role restrictions
        ]
      })
      .sort({ category: 1, order: 1 })
      .exec();
  }

  async getResourcesByDepartment(departments: string[]): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({
        isActive: true,
        $or: [
          { applicableDepartments: { $in: departments } },
          { applicableDepartments: { $size: 0 } } // Resources without department restrictions
        ]
      })
      .sort({ category: 1, order: 1 })
      .exec();
  }

  async getOnboardingResources(): Promise<CompanyResource[]> {
    return this.resourceModel
      .find({ isRequired: true, isActive: true })
      .sort({ category: 1, order: 1 })
      .exec();
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.resourceModel.findByIdAndUpdate(id, {
      $inc: { 'metadata.viewCount': 1 },
      $set: { 'metadata.lastAccessedAt': new Date() }
    });
  }

  async incrementDownloadCount(id: string): Promise<void> {
    await this.resourceModel.findByIdAndUpdate(id, {
      $inc: { 'metadata.downloadCount': 1 }
    });
  }

  async getResourceStats() {
    const totalResources = await this.resourceModel.countDocuments({ isActive: true });
    
    const categoryStats = await this.resourceModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const typeStats = await this.resourceModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const mostViewed = await this.resourceModel
      .find({ isActive: true })
      .sort({ 'metadata.viewCount': -1 })
      .limit(5)
      .select('title type category metadata.viewCount')
      .exec();

    const recentlyAdded = await this.resourceModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title type category createdAt')
      .exec();

    const totalViews = await this.resourceModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalViews: { $sum: '$metadata.viewCount' } } }
    ]);

    const totalDownloads = await this.resourceModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalDownloads: { $sum: '$metadata.downloadCount' } } }
    ]);

    return {
      totalResources,
      categoryStats,
      typeStats,
      mostViewed,
      recentlyAdded,
      totalViews: totalViews[0]?.totalViews || 0,
      totalDownloads: totalDownloads[0]?.totalDownloads || 0,
    };
  }

  async createDefaultResources(): Promise<void> {
    const defaultResources = [
      {
        title: 'Manual del Empleado',
        description: 'Guía completa con políticas, procedimientos y beneficios de la empresa',
        type: ResourceType.HANDBOOK,
        category: ResourceCategory.EMPLOYEE_HANDBOOK,
        content: 'Contenido del manual del empleado...',
        tags: ['políticas', 'procedimientos', 'beneficios'],
        order: 1,
        isRequired: true,
        applicableRoles: [],
        applicableDepartments: [],
        estimatedReadTime: 60,
        accessLevel: 'internal',
        summary: 'Manual completo que cubre todas las políticas y procedimientos de la empresa',
      },
      {
        title: 'Política de Seguridad IT',
        description: 'Directrices de seguridad informática y mejores prácticas',
        type: ResourceType.POLICY,
        category: ResourceCategory.SECURITY,
        content: 'Política de seguridad IT...',
        tags: ['seguridad', 'IT', 'contraseñas'],
        order: 1,
        isRequired: true,
        requiresSignature: true,
        estimatedReadTime: 20,
        accessLevel: 'internal',
      },
      {
        title: 'Guía de Configuración IT',
        description: 'Paso a paso para configurar equipos y accesos',
        type: ResourceType.DOCUMENT,
        category: ResourceCategory.IT_SETUP,
        content: 'Guía de configuración...',
        tags: ['IT', 'configuración', 'equipos'],
        order: 1,
        isRequired: true,
        estimatedReadTime: 30,
        accessLevel: 'internal',
      },
      {
        title: 'Cultura y Valores Empresariales',
        description: 'Introducción a nuestra cultura organizacional',
        type: ResourceType.VIDEO,
        category: ResourceCategory.CULTURE,
        externalUrl: '/videos/company-culture',
        tags: ['cultura', 'valores', 'misión'],
        order: 1,
        isRequired: true,
        estimatedReadTime: 15,
        accessLevel: 'internal',
      },
      {
        title: 'Preguntas Frecuentes - Beneficios',
        description: 'Respuestas a preguntas comunes sobre beneficios',
        type: ResourceType.FAQ,
        category: ResourceCategory.BENEFITS,
        faqs: [
          {
            question: '¿Cuándo puedo usar mis días de vacaciones?',
            answer: 'Los días de vacaciones se pueden usar después de completar 90 días de trabajo.',
            category: 'vacaciones',
            order: 1,
          },
          {
            question: '¿Cómo funciona el seguro médico?',
            answer: 'El seguro médico cubre el 80% de gastos médicos después de completar el período de prueba.',
            category: 'seguro',
            order: 2,
          },
        ],
        tags: ['beneficios', 'FAQ', 'vacaciones', 'seguro'],
        order: 1,
        isRequired: false,
        estimatedReadTime: 10,
        accessLevel: 'internal',
      },
    ];

    for (const resourceData of defaultResources) {
      const exists = await this.resourceModel.findOne({ title: resourceData.title });
      if (!exists) {
        await this.create(resourceData);
      }
    }
  }
}