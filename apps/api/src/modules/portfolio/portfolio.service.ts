// apps/api/src/modules/portfolio/portfolio.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Startup, StartupDocument } from './schemas/startup.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
  ) {}

  async create(createStartupDto: CreateStartupDto): Promise<Startup> {
    const createdStartup = new this.startupModel({
      ...createStartupDto,
      squad: {
        lead: createStartupDto.squadLead,
        members: createStartupDto.squadMembers,
      },
    });
    return createdStartup.save();
  }

  async findAll(filters?: any): Promise<Startup[]> {
    const query = this.startupModel.find();
    
    if (filters?.stage) {
      query.where('stage').in(filters.stage);
    }
    
    if (filters?.status) {
      query.where('status').equals(filters.status);
    }
    
    return query
      .populate('squad.lead', 'profile.name email')
      .populate('squad.members', 'profile.name email')
      .exec();
  }

  async findOne(id: string): Promise<Startup> {
    const startup = await this.startupModel
      .findById(id)
      .populate('squad.lead')
      .populate('squad.members')
      .exec();
      
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    
    return startup;
  }

  async update(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup> {
    const updatedStartup = await this.startupModel
      .findByIdAndUpdate(
        id,
        { $set: updateStartupDto },
        { new: true, runValidators: true }
      )
      .exec();
      
    if (!updatedStartup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    
    return updatedStartup;
  }

  async updateKPIs(id: string, kpis: any[]): Promise<Startup> {
    const updatedStartup = await this.startupModel
      .findByIdAndUpdate(
        id,
        { 
          $set: { 
            kpis: kpis.map(kpi => ({
              ...kpi,
              lastUpdated: new Date()
            }))
          }
        },
        { new: true }
      )
      .exec();
      
    if (!updatedStartup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    
    return updatedStartup;
  }

  async remove(id: string): Promise<void> {
    const result = await this.startupModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
  }
}