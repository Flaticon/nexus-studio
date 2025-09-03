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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardMetricsSchema = exports.DashboardMetrics = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DashboardMetrics = class DashboardMetrics {
    date;
    startups;
    financials;
    team;
    users;
    okrs;
};
exports.DashboardMetrics = DashboardMetrics;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], DashboardMetrics.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            total: Number,
            active: Number,
            paused: Number,
            archived: Number,
            byStage: {
                idea: Number,
                validation: Number,
                pmf: Number,
                growth: Number,
                scale: Number
            }
        }
    }),
    __metadata("design:type", Object)
], DashboardMetrics.prototype, "startups", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalRevenue: Number,
            totalCosts: Number,
            netIncome: Number,
            burnRate: Number,
            runway: Number,
            mrr: Number,
            arr: Number
        }
    }),
    __metadata("design:type", Object)
], DashboardMetrics.prototype, "financials", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalMembers: Number,
            activeMembers: Number,
            utilizationRate: Number,
            availableCapacity: Number
        }
    }),
    __metadata("design:type", Object)
], DashboardMetrics.prototype, "team", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalUsers: Number,
            activeUsers: Number,
            averageNPS: Number,
            churnRate: Number
        }
    }),
    __metadata("design:type", Object)
], DashboardMetrics.prototype, "users", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            totalObjectives: Number,
            completedObjectives: Number,
            averageProgress: Number,
            onTrack: Number,
            atRisk: Number,
            behind: Number
        }
    }),
    __metadata("design:type", Object)
], DashboardMetrics.prototype, "okrs", void 0);
exports.DashboardMetrics = DashboardMetrics = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DashboardMetrics);
exports.DashboardMetricsSchema = mongoose_1.SchemaFactory.createForClass(DashboardMetrics);
//# sourceMappingURL=dashboard-metrics.schema.js.map