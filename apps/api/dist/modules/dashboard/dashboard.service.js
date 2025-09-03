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
const dashboard_metrics_schema_1 = require("./schemas/dashboard-metrics.schema");
const alert_schema_1 = require("./schemas/alert.schema");
const startup_schema_1 = require("../portfolio/schemas/startup.schema");
let DashboardService = DashboardService_1 = class DashboardService {
    metricsModel;
    alertModel;
    startupModel;
    logger = new common_1.Logger(DashboardService_1.name);
    constructor(metricsModel, alertModel, startupModel) {
        this.metricsModel = metricsModel;
        this.alertModel = alertModel;
        this.startupModel = startupModel;
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
        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
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
        const startups = await this.startupModel
            .find({ status: 'active' })
            .sort({ 'kpis.0.current': -1 })
            .limit(5)
            .exec();
        return startups.map((startup) => ({
            id: startup._id.toString(),
            name: startup.name,
            metric: startup.kpis[0]?.name || 'Revenue',
            value: startup.kpis[0]?.current || 0,
            change: this.calculateGrowth(startup.kpis[0]?.current || 0, startup.kpis[0]?.target || 0)
        }));
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
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dashboard_metrics_schema_1.DashboardMetrics.name)),
    __param(1, (0, mongoose_1.InjectModel)(alert_schema_1.Alert.name)),
    __param(2, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map