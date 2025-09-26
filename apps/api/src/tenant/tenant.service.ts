import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from '../schemas/tenant.schema';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private tenantModel: Model<Tenant>
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Check if subdomain is available
    const existingTenant = await this.tenantModel.findOne({
      subdomain: createTenantDto.subdomain
    });

    if (existingTenant) {
      throw new BadRequestException('Subdomain is already taken');
    }

    // Check if email is already registered
    const existingEmail = await this.tenantModel.findOne({
      email: createTenantDto.email
    });

    if (existingEmail) {
      throw new BadRequestException('Email is already registered');
    }

    // Set trial period (30 days)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 30);

    const tenant = new this.tenantModel({
      ...createTenantDto,
      status: 'trial',
      trialEndsAt,
      usage: {
        venturesCount: 0,
        usersCount: 1,
        storageUsed: 0
      }
    });

    return tenant.save();
  }

  async findAll(page = 1, limit = 10): Promise<{ tenants: Tenant[]; total: number }> {
    const skip = (page - 1) * limit;

    const [tenants, total] = await Promise.all([
      this.tenantModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.tenantModel.countDocuments()
    ]);

    return { tenants, total };
  }

  async findBySubdomain(subdomain: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findOne({ subdomain });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findById(id: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findById(id);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.tenantModel.findByIdAndUpdate(
      id,
      updateTenantDto,
      { new: true }
    );

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async updateUsage(tenantId: string, usage: Partial<Tenant['usage']>): Promise<Tenant> {
    const tenant = await this.tenantModel.findByIdAndUpdate(
      tenantId,
      { $set: { usage } },
      { new: true }
    );

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async updateBilling(tenantId: string, billing: Partial<Tenant['billing']>): Promise<Tenant> {
    const tenant = await this.tenantModel.findByIdAndUpdate(
      tenantId,
      { $set: { billing } },
      { new: true }
    );

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async checkSubdomainAvailable(subdomain: string): Promise<boolean> {
    const tenant = await this.tenantModel.findOne({ subdomain });
    return !tenant;
  }

  async getStats(): Promise<any> {
    const totalTenants = await this.tenantModel.countDocuments();
    const activeTenants = await this.tenantModel.countDocuments({ status: 'active' });
    const trialTenants = await this.tenantModel.countDocuments({ status: 'trial' });
    const suspendedTenants = await this.tenantModel.countDocuments({ status: 'suspended' });

    const planDistribution = await this.tenantModel.aggregate([
      { $group: { _id: '$plan', count: { $sum: 1 } } }
    ]);

    return {
      total: totalTenants,
      active: activeTenants,
      trial: trialTenants,
      suspended: suspendedTenants,
      planDistribution
    };
  }
}