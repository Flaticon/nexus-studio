"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const startup_schema_1 = require("./schemas/startup.schema");
const comparison_schema_1 = require("./schemas/comparison.schema");
let PortfolioService = class PortfolioService {
    startupModel;
    comparisonModel;
    constructor(startupModel, comparisonModel) {
        this.startupModel = startupModel;
        this.comparisonModel = comparisonModel;
    }
    async create(createStartupDto) {
        const existing = await this.startupModel.findOne({
            slug: createStartupDto.slug
        });
        if (existing) {
            throw new common_1.BadRequestException('Startup with this slug already exists');
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
                    userName: 'System',
                    timestamp: new Date()
                }]
        });
        return createdStartup.save();
    }
    async findAll(filters) {
        const query = {};
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
        const sortOptions = {};
        if (filters.sortBy) {
            sortOptions[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
        }
        else {
            sortOptions.createdAt = -1;
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
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
    async findOne(id) {
        const startup = await this.startupModel
            .findById(id)
            .populate('squad.lead', 'profile.name email skills')
            .populate('squad.members', 'profile.name email skills')
            .exec();
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return startup;
    }
    async update(id, updateStartupDto) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        if (updateStartupDto.stage && updateStartupDto.stage !== startup.stage) {
            startup.timeline.push({
                stage: updateStartupDto.stage,
                date: new Date(),
                description: `Stage changed from ${startup.stage} to ${updateStartupDto.stage}`
            });
        }
        startup.activityLog.push({
            action: 'updated',
            description: 'Startup details updated',
            userName: 'System',
            changes: updateStartupDto,
            timestamp: new Date()
        });
        Object.assign(startup, updateStartupDto);
        return startup.save();
    }
    async moveToNextStage(id, milestone) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        const stages = Object.values(startup_schema_1.StartupStage);
        const currentIndex = stages.indexOf(startup.stage);
        if (currentIndex === stages.length - 1) {
            throw new common_1.BadRequestException('Startup is already at the final stage');
        }
        const nextStage = stages[currentIndex + 1];
        startup.stage = nextStage;
        startup.timeline.push({
            stage: nextStage,
            date: new Date(),
            description: `Moved to ${nextStage} stage`,
            milestone
        });
        startup.activityLog.push({
            action: 'stage_change',
            description: `Moved from ${stages[currentIndex]} to ${nextStage}`,
            userName: 'System',
            timestamp: new Date()
        });
        return startup.save();
    }
    async addDocument(id, documentDto) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        startup.documents.push({
            ...documentDto,
            uploadedAt: new Date(),
            uploadedBy: 'System'
        });
        startup.activityLog.push({
            action: 'document_added',
            description: `Document "${documentDto.name}" added`,
            userName: 'System',
            timestamp: new Date()
        });
        return startup.save();
    }
    async updateMetrics(id, metrics) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        const previousMetrics = [...startup.metrics];
        startup.metrics = metrics.map(metric => ({
            ...metric,
            recordedAt: new Date(),
            previousValue: previousMetrics.find(m => m.name === metric.name)?.value
        }));
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
        });
        return startup.save();
    }
    async addMilestone(id, milestone) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        startup.milestones.push({
            ...milestone,
            completed: false
        });
        return startup.save();
    }
    async completeMilestone(startupId, milestoneIndex) {
        const startup = await this.startupModel.findById(startupId);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
        }
        if (!startup.milestones[milestoneIndex]) {
            throw new common_1.NotFoundException(`Milestone not found`);
        }
        startup.milestones[milestoneIndex].completed = true;
        startup.milestones[milestoneIndex].completedAt = new Date();
        startup.activityLog.push({
            action: 'milestone_completed',
            description: `Milestone "${startup.milestones[milestoneIndex].title}" completed`,
            userName: 'System',
            timestamp: new Date()
        });
        return startup.save();
    }
    async getPipelineView() {
        const stages = Object.values(startup_schema_1.StartupStage);
        const pipeline = await Promise.all(stages.map(async (stage) => {
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
        }));
        return pipeline;
    }
    async compareStartups(startupIds) {
        const startups = await this.startupModel
            .find({ _id: { $in: startupIds } })
            .exec();
        if (startups.length !== startupIds.length) {
            throw new common_1.NotFoundException('One or more startups not found');
        }
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
    async saveComparison(name, startupIds, metrics, userId) {
        const comparison = new this.comparisonModel({
            name,
            startupIds: startupIds.map(id => new mongoose_2.Types.ObjectId(id)),
            metrics,
            createdBy: new mongoose_2.Types.ObjectId(userId),
            snapshot: await this.compareStartups(startupIds)
        });
        return comparison.save();
    }
    async getSavedComparisons(userId) {
        const query = userId ? { createdBy: userId } : {};
        return this.comparisonModel
            .find(query)
            .populate('startupIds', 'name slug')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getActivityLog(startupId, limit = 50) {
        if (startupId) {
            const startup = await this.startupModel
                .findById(startupId)
                .select('activityLog')
                .exec();
            if (!startup) {
                throw new common_1.NotFoundException(`Startup with ID ${startupId} not found`);
            }
            return startup.activityLog
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, limit);
        }
        const startups = await this.startupModel
            .find()
            .select('name activityLog')
            .exec();
        const allActivity = startups.flatMap(s => s.activityLog.map(a => ({
            ...a,
            startupName: s.name,
            startupId: s.id
        })));
        return allActivity
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit);
    }
    async getStatistics() {
        const [totalStartups, byStage, byStatus, recentActivity, topPerformers] = await Promise.all([
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
    async getCountByStage() {
        const stages = Object.values(startup_schema_1.StartupStage);
        const counts = await Promise.all(stages.map(async (stage) => ({
            stage,
            count: await this.startupModel.countDocuments({ stage })
        })));
        return counts;
    }
    async getCountByStatus() {
        return {
            active: await this.startupModel.countDocuments({ status: 'active' }),
            paused: await this.startupModel.countDocuments({ status: 'paused' }),
            archived: await this.startupModel.countDocuments({ status: 'archived' })
        };
    }
    async getTopPerformers() {
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
    aggregateMetricsForComparison(startups) {
        const metricNames = new Set();
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
    aggregateTimelineForComparison(startups) {
        return startups.map(s => ({
            startupId: s.id,
            startupName: s.name,
            timeline: s.timeline
        }));
    }
    async remove(id) {
        const startup = await this.startupModel.findById(id);
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        await this.startupModel.findByIdAndDelete(id);
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __param(1, (0, mongoose_1.InjectModel)(comparison_schema_1.Comparison.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map