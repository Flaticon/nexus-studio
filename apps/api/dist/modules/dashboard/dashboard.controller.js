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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_filter_dto_1 = require("./dto/dashboard-filter.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getExecutiveSummary(filters) {
        return this.dashboardService.getExecutiveSummary(filters);
    }
    getMetrics(filters) {
        return this.dashboardService.getMetrics(filters);
    }
    getAlerts() {
        return this.dashboardService.getActiveAlerts();
    }
    createAlert(alertData) {
        return this.dashboardService.createAlert(alertData);
    }
    dismissAlert(id) {
        return this.dashboardService.dismissAlert(id);
    }
    async calculateMetrics() {
        await this.dashboardService.calculateDailyMetrics();
        return { message: 'Metrics calculation started' };
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('executive-summary'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_filter_dto_1.DashboardFilterDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getExecutiveSummary", null);
__decorate([
    (0, common_1.Get)('metrics'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_filter_dto_1.DashboardFilterDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('alerts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Post)('alerts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "createAlert", null);
__decorate([
    (0, common_1.Patch)('alerts/:id/dismiss'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "dismissAlert", null);
__decorate([
    (0, common_1.Post)('metrics/calculate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "calculateMetrics", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('api/dashboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map