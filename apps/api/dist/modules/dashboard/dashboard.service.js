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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const dashboard_metrics_schema_1 = require("./schemas/dashboard-metrics.schema");
const alert_schema_1 = require("./schemas/alert.schema");
let DashboardService = DashboardService_1 = class DashboardService {
    metricsModel;
    alertModel;
    logger = new common_1.Logger(DashboardService_1.name);
    constructor(metricsModel, alertModel) {
        this.metricsModel = metricsModel;
        this.alertModel = alertModel;
    }
    async getMetrics(filters) {
        const query = {};
        if (filters?.startDate && filters?.endDate) {
            query.date = {
                $gte: new Date(filters.startDate),
                $lte: new Date(filters.endDate)
            };
        }
        return this.metricsModel
            .findOne(query)
            .sort({ date: -1 })
            .exec();
    }
    async dismissAlert(id) {
        return this.alertModel
            .findByIdAndUpdate(id, { isDismissed: true }, { new: true })
            .exec();
    }
    async calculateDailyMetrics() {
        this.logger.log('Calculating daily metrics...');
        try {
            const metrics = await this.collectMetrics();
            await this.saveMetrics(metrics);
            await this.checkForAlerts(metrics);
            this.logger.log('Daily metrics calculated successfully');
        }
        catch (error) {
            this.logger.error('Error calculating daily metrics:', error);
        }
    }
    async getCurrentMetrics() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.metricsModel
            .findOne({
            date: { $gte: today }
        })
            .sort({ date: -1 })
            .exec();
    }
    async getMetricsForDate(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return this.metricsModel
            .findOne({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
            .sort({ date: -1 })
            .exec();
    }
    async getRecentActivity() {
        const recentAlerts = await this.alertModel
            .find({
            createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
        return recentAlerts.map(alert => ({
            id: alert._id.toString(),
            type: 'alert',
            title: alert.title,
            description: alert.message,
            timestamp: alert.createdAt,
            category: alert.category
        }));
    }
    calculateGrowth(current, previous) {
        if (previous === 0)
            return current > 0 ? 100 : 0;
        return Number(((current - previous) / previous * 100).toFixed(2));
    }
    calculateTrend(current, previous) {
        const difference = current - previous;
        const threshold = previous * 0.05;
        if (Math.abs(difference) <= threshold) {
            return 'stable';
        }
        return difference > 0 ? 'up' : 'down';
    }
    async collectMetrics() {
        return {
            date: new Date(),
            startups: {
                total: 25,
                active: 20,
                paused: 3,
                archived: 2,
                byStage: {
                    idea: 5,
                    validation: 8,
                    pmf: 4,
                    growth: 6,
                    scale: 2
                }
            },
            financials: {
                totalRevenue: 450000,
                totalCosts: 320000,
                netIncome: 130000,
                burnRate: 25000,
                runway: 18,
                mrr: 37500,
                arr: 450000
            },
            team: {
                totalMembers: 85,
                activeMembers: 78,
                utilizationRate: 75,
                availableCapacity: 25
            },
            users: {
                totalUsers: 12500,
                activeUsers: 8900,
                averageNPS: 8.2,
                churnRate: 5.2
            },
            okrs: {
                totalObjectives: 24,
                completedObjectives: 18,
                averageProgress: 78,
                onTrack: 15,
                atRisk: 6,
                behind: 3
            }
        };
    }
    async saveMetrics(metrics) {
        const metricsDoc = new this.metricsModel(metrics);
        return metricsDoc.save();
    }
    async getActiveAlerts() {
        return this.alertModel
            .find({
            isDismissed: false,
            $or: [
                { expiresAt: { $gt: new Date() } },
                { expiresAt: null }
            ]
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .exec();
    }
    async createAlert(alertData) {
        const alert = new this.alertModel(alertData);
        return alert.save();
    }
    async getExecutiveSummary(filters) {
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const currentMetrics = await this.getCurrentMetrics();
        const previousMetrics = await this.getMetricsForDate(lastWeek);
        const alerts = await this.getActiveAlerts();
        const recentActivity = await this.getRecentActivity();
        const topPerformers = await this.getTopPerformers();
        const weeklyGrowth = this.calculateGrowth(currentMetrics?.startups?.total || 0, previousMetrics?.startups?.total || 0);
        const revenueGrowth = this.calculateGrowth(currentMetrics?.financials?.totalRevenue || 0, previousMetrics?.financials?.totalRevenue || 0);
        return {
            metrics: {
                startups: {
                    total: currentMetrics?.startups?.total || 0,
                    active: currentMetrics?.startups?.active || 0,
                    weeklyGrowth
                },
                revenue: {
                    current: currentMetrics?.financials?.totalRevenue || 0,
                    mrr: currentMetrics?.financials?.mrr || 0,
                    growth: revenueGrowth
                },
                burnRate: {
                    current: currentMetrics?.financials?.burnRate || 0,
                    runway: currentMetrics?.financials?.runway || 0,
                    trend: this.calculateTrend(currentMetrics?.financials?.burnRate || 0, previousMetrics?.financials?.burnRate || 0)
                },
                team: {
                    total: currentMetrics?.team?.totalMembers || 0,
                    utilization: currentMetrics?.team?.utilizationRate || 0
                }
            },
            alerts: alerts.map(alert => ({
                id: alert._id.toString(),
                type: alert.type,
                title: alert.title,
                message: alert.message,
                timestamp: alert.createdAt
            })),
            recentActivity,
            topPerformers
        };
    }
    async getTopPerformers() {
        return [
            {
                id: '507f1f77bcf86cd799439011',
                name: 'TechStart Alpha',
                metric: 'Revenue',
                value: 125000,
                change: 15.2
            },
            {
                id: '507f1f77bcf86cd799439012',
                name: 'InnovateCorp',
                metric: 'Users',
                value: 8500,
                change: 22.1
            },
            {
                id: '507f1f77bcf86cd799439013',
                name: 'DataFlow Pro',
                metric: 'MRR',
                value: 18000,
                change: 8.7
            }
        ];
    }
    async checkForAlerts(metrics) {
        if (metrics.financials.runway < 6) {
            await this.createAlert({
                title: 'Low Runway Alert',
                message: `Current runway is only ${metrics.financials.runway} months`,
                type: alert_schema_1.AlertType.CRITICAL,
                category: alert_schema_1.AlertCategory.FINANCIAL
            });
        }
        if (metrics.team.utilizationRate > 90) {
            await this.createAlert({
                title: 'High Team Utilization',
                message: `Team utilization is at ${metrics.team.utilizationRate}%`,
                type: alert_schema_1.AlertType.WARNING,
                category: alert_schema_1.AlertCategory.TEAM
            });
        }
        if (metrics.okrs.behind > 5) {
            await this.createAlert({
                title: 'OKRs Behind Schedule',
                message: `${metrics.okrs.behind} objectives are behind schedule`,
                type: alert_schema_1.AlertType.WARNING,
                category: alert_schema_1.AlertCategory.PERFORMANCE
            });
        }
    }
};
exports.DashboardService = DashboardService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardService.prototype, "calculateDailyMetrics", null);
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dashboard_metrics_schema_1.DashboardMetrics.name)),
    __param(1, (0, mongoose_1.InjectModel)(alert_schema_1.Alert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map