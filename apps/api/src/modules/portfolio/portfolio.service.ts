// apps/api/src/modules/portfolio/portfolio.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Startup, StartupDocument, StartupStage } from './schemas/startup.schema';
import { Comparison, ComparisonDocument } from './schemas/comparison.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { PortfolioFilterDto } from './dto/portfolio-filter.dto';
import { AddDocumentDto } from './dto/add-document.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Startup.name) 
    private startupModel: Model<StartupDocument>,
    @InjectModel(Comparison.name)
    private comparisonModel: Model<ComparisonDocument>,
  ) {}

  // Create new startup
  async create(createStartupDto: CreateStartupDto): Promise<Startup> {
    // Check if slug already exists
    const existing = await this.startupModel.findOne({ 
      slug: createStartupDto.slug 
    });
    
    if (existing) {
      throw new BadRequestException('Startup with this slug already exists');
    }

    const createdStartup = new this.startupModel({
      ...createStartupDto,
      squad: {
        lead: createStartupDto.squadLead,
        members: createStartupDto.squadMembers,
      },
      timeline: [{
        stage: createStartupDto.stage,
        date: new Date(),
        description: 'Startup created'
      }],
      activityLog: [{
        action: 'created',
        description: `Startup ${createStartupDto.name} was created`,
        userName: 'System', // TODO: Get from auth context
        timestamp: new Date()
      }]
    });

    return createdStartup.save();
  }

  // Get all startups with filters and pagination
  async findAll(filters: PortfolioFilterDto) {
    const query: any = {};
    
    // Build query based on filters
    if (filters.stage) {
      query.stage = filters.stage;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }
    
    if (filters.industry) {
      query.industry = filters.industry;
    }
    
    if (filters.squadLead) {
      query['squad.lead'] = filters.squadLead;
    }
    
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { industry: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate)
      };
    }

    // Build sort options
    const sortOptions: any = {};
    if (filters.sortBy) {
      sortOptions[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    // Execute query
    const [startups, total] = await Promise.all([
      this.startupModel
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('squad.lead', 'profile.name email')
        .populate('squad.members', 'profile.name email')
        .exec(),
      this.startupModel.countDocuments(query)
    ]);

    return {
      data: startups,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get single startup with full details
  async findOne(id: string): Promise<Startup> {
    const startup = await this.startupModel
      .findById(id)
      .populate('squad.lead', 'profile.name email skills')
      .populate('squad.members', 'profile.name email skills')
      .exec();
      
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }
    
    return startup;
  }

  // Update startup
  async update(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    // Track stage changes in timeline
    if (updateStartupDto.stage && updateStartupDto.stage !== startup.stage) {
      startup.timeline.push({
        stage: updateStartupDto.stage,
        date: new Date(),
        description: `Stage changed from ${startup.stage} to ${updateStartupDto.stage}`
      } as any);
    }

    // Add to activity log
    startup.activityLog.push({
      action: 'updated',
      description: 'Startup details updated',
      userName: 'System', // TODO: Get from auth context
      changes: updateStartupDto,
      timestamp: new Date()
    } as any);

    // Update fields
    Object.assign(startup, updateStartupDto);

    return startup.save();
  }

  // Move startup to next stage
  async moveToNextStage(id: string, milestone?: string): Promise<Startup> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    const stages = Object.values(StartupStage);
    const currentIndex = stages.indexOf(startup.stage);
    
    if (currentIndex === stages.length - 1) {
      throw new BadRequestException('Startup is already at the final stage');
    }

    const nextStage = stages[currentIndex + 1];
    
    // Update stage and timeline
    startup.stage = nextStage as StartupStage;
    startup.timeline.push({
      stage: nextStage,
      date: new Date(),
      description: `Moved to ${nextStage} stage`,
      milestone
    } as any);

    // Add to activity log
    startup.activityLog.push({
      action: 'stage_change',
      description: `Moved from ${stages[currentIndex]} to ${nextStage}`,
      userName: 'System', // TODO: Get from auth context
      timestamp: new Date()
    } as any);

    return startup.save();
  }

  // Add document to startup
  async addDocument(id: string, documentDto: AddDocumentDto): Promise<Startup> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    startup.documents.push({
      ...documentDto,
      uploadedAt: new Date(),
      uploadedBy: 'System' // TODO: Get from auth context
    } as any);

    startup.activityLog.push({
      action: 'document_added',
      description: `Document "${documentDto.name}" added`,
      userName: 'System',
      timestamp: new Date()
    } as any);

    return startup.save();
  }

  // Update metrics
  async updateMetrics(id: string, metrics: any[]): Promise<Startup> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    // Store previous values
    const previousMetrics = [...startup.metrics];

    // Update metrics
    startup.metrics = metrics.map(metric => ({
      ...metric,
      recordedAt: new Date(),
      previousValue: previousMetrics.find(m => m.name === metric.name)?.value
    })) as any;

    // Update KPIs if they exist in metrics
    startup.kpis = metrics
      .filter(m => m.isKpi)
      .map(m => ({
        name: m.name,
        current: m.value,
        target: m.target || 0,
        unit: m.unit,
        lastUpdated: new Date()
      }));

    startup.activityLog.push({
      action: 'metrics_updated',
      description: 'Metrics updated',
      userName: 'System',
      changes: { metrics },
      timestamp: new Date()
    } as any);

    return startup.save();
  }

  // Add milestone
  async addMilestone(id: string, milestone: any): Promise<Startup> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    startup.milestones.push({
      ...milestone,
      completed: false
    } as any);

    return startup.save();
  }

  // Complete milestone
  async completeMilestone(startupId: string, milestoneIndex: number): Promise<Startup> {
    const startup = await this.startupModel.findById(startupId);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${startupId} not found`);
    }

    if (!startup.milestones[milestoneIndex]) {
      throw new NotFoundException(`Milestone not found`);
    }

    startup.milestones[milestoneIndex].completed = true;
    startup.milestones[milestoneIndex].completedAt = new Date();

    startup.activityLog.push({
      action: 'milestone_completed',
      description: `Milestone "${startup.milestones[milestoneIndex].title}" completed`,
      userName: 'System',
      timestamp: new Date()
    } as any);

    return startup.save();
  }

  // Get pipeline view data
  async getPipelineView() {
    const stages = Object.values(StartupStage);
    const pipeline = await Promise.all(
      stages.map(async (stage) => {
        const startups = await this.startupModel
          .find({ stage, status: 'active' })
          .select('name slug logo kpis metrics stage')
          .exec();

        return {
          stage,
          count: startups.length,
          startups: startups.map(s => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            logo: s.logo,
            mainKpi: s.kpis[0] || null,
            revenue: s.metrics.find(m => m.name === 'Revenue')?.value || 0
          }))
        };
      })
    );

    return pipeline;
  }

  // Get comparison data
  async compareStartups(startupIds: string[]) {
    const startups = await this.startupModel
      .find({ _id: { $in: startupIds } })
      .exec();

    if (startups.length !== startupIds.length) {
      throw new NotFoundException('One or more startups not found');
    }

    // Prepare comparison data
    const comparisonData = {
      startups: startups.map(s => ({
        id: s._id,
        name: s.name,
        stage: s.stage,
        status: s.status
      })),
      metrics: this.aggregateMetricsForComparison(startups),
      timeline: this.aggregateTimelineForComparison(startups),
      team: startups.map(s => ({
        id: s._id,
        name: s.name,
        teamSize: s.squad.members.length + 1
      }))
    };

    return comparisonData;
  }

  // Save comparison
  async saveComparison(name: string, startupIds: string[], metrics: string[], userId: string) {
    const comparison = new this.comparisonModel({
      name,
      startupIds: startupIds.map(id => new Types.ObjectId(id)),
      metrics,
      createdBy: new Types.ObjectId(userId),
      snapshot: await this.compareStartups(startupIds)
    });

    return comparison.save();
  }

  // Get saved comparisons
  async getSavedComparisons(userId?: string) {
    const query = userId ? { createdBy: userId } : {};
    return this.comparisonModel
      .find(query)
      .populate('startupIds', 'name slug')
      .sort({ createdAt: -1 })
      .exec();
  }

  // Get activity log
  async getActivityLog(startupId?: string, limit = 50) {
    if (startupId) {
      const startup = await this.startupModel
        .findById(startupId)
        .select('activityLog')
        .exec();
      
      if (!startup) {
        throw new NotFoundException(`Startup with ID ${startupId} not found`);
      }
      
      return startup.activityLog
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, limit);
    }

    // Get activity from all startups
    const startups = await this.startupModel
      .find()
      .select('name activityLog')
      .exec();

    const allActivity = startups.flatMap(s => 
      s.activityLog.map(a => ({
        ...a,
        startupName: s.name,
        startupId: s.id
      }))
    );

    return allActivity
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  // Get statistics
  async getStatistics() {
    const [
      totalStartups,
      byStage,
      byStatus,
      recentActivity,
      topPerformers
    ] = await Promise.all([
      this.startupModel.countDocuments(),
      this.getCountByStage(),
      this.getCountByStatus(),
      this.getActivityLog(undefined, 10),
      this.getTopPerformers()
    ]);

    return {
      total: totalStartups,
      byStage,
      byStatus,
      recentActivity,
      topPerformers
    };
  }

  // Helper methods
  private async getCountByStage() {
    const stages = Object.values(StartupStage);
    const counts = await Promise.all(
      stages.map(async (stage) => ({
        stage,
        count: await this.startupModel.countDocuments({ stage })
      }))
    );
    return counts;
  }

  private async getCountByStatus() {
    return {
      active: await this.startupModel.countDocuments({ status: 'active' }),
      paused: await this.startupModel.countDocuments({ status: 'paused' }),
      archived: await this.startupModel.countDocuments({ status: 'archived' })
    };
  }

  private async getTopPerformers() {
    const startups = await this.startupModel
      .find({ status: 'active' })
      .select('name metrics kpis')
      .exec();

    return startups
      .map(s => ({
        id: s._id,
        name: s.name,
        revenue: s.metrics.find(m => m.name === 'Revenue')?.value || 0,
        growth: s.kpis.find(k => k.name === 'Growth')?.current || 0
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }

  private aggregateMetricsForComparison(startups: StartupDocument[]) {
    const metricNames = new Set<string>();
    startups.forEach(s => {
      s.metrics.forEach(m => metricNames.add(m.name));
    });

    return Array.from(metricNames).map(metricName => ({
      metric: metricName,
      values: startups.map(s => ({
        startupId: s.id,
        startupName: s.name,
        value: s.metrics.find(m => m.name === metricName)?.value || 0,
        unit: s.metrics.find(m => m.name === metricName)?.unit || ''
      }))
    }));
  }

  private aggregateTimelineForComparison(startups: StartupDocument[]) {
    return startups.map(s => ({
      startupId: s.id,
      startupName: s.name,
      timeline: s.timeline
    }));
  }

  // Remove startup
  async remove(id: string): Promise<void> {
    const startup = await this.startupModel.findById(id);
    
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    await this.startupModel.findByIdAndDelete(id);
  }
}