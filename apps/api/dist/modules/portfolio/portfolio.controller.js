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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const create_startup_dto_1 = require("./dto/create-startup.dto");
const update_startup_dto_1 = require("./dto/update-startup.dto");
const portfolio_filter_dto_1 = require("./dto/portfolio-filter.dto");
const add_document_dto_1 = require("./dto/add-document.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let PortfolioController = class PortfolioController {
    portfolioService;
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    create(createStartupDto) {
        return this.portfolioService.create(createStartupDto);
    }
    findAll(filters) {
        return this.portfolioService.findAll(filters);
    }
    findOne(id) {
        return this.portfolioService.findOne(id);
    }
    update(id, updateStartupDto) {
        return this.portfolioService.update(id, updateStartupDto);
    }
    remove(id) {
        return this.portfolioService.remove(id);
    }
    moveToNextStage(id, milestone) {
        return this.portfolioService.moveToNextStage(id, milestone);
    }
    addDocument(id, documentDto) {
        return this.portfolioService.addDocument(id, documentDto);
    }
    updateMetrics(id, metrics) {
        return this.portfolioService.updateMetrics(id, metrics);
    }
    addMilestone(id, milestone) {
        return this.portfolioService.addMilestone(id, milestone);
    }
    completeMilestone(id, index) {
        return this.portfolioService.completeMilestone(id, index);
    }
    getPipelineView() {
        return this.portfolioService.getPipelineView();
    }
    getStatistics() {
        return this.portfolioService.getStatistics();
    }
    getActivityLog(startupId) {
        return this.portfolioService.getActivityLog(startupId);
    }
    compareStartups(startupIds) {
        return this.portfolioService.compareStartups(startupIds);
    }
    saveComparison(name, startupIds, metrics, req) {
        return this.portfolioService.saveComparison(name, startupIds, metrics, req.user.id);
    }
    getSavedComparisons(req) {
        return this.portfolioService.getSavedComparisons(req.user.id);
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.Post)('startups'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_startup_dto_1.CreateStartupDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('startups'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [portfolio_filter_dto_1.PortfolioFilterDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('startups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('startups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_startup_dto_1.UpdateStartupDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('startups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('startups/:id/next-stage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('milestone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "moveToNextStage", null);
__decorate([
    (0, common_1.Post)('startups/:id/documents'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_document_dto_1.AddDocumentDto]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "addDocument", null);
__decorate([
    (0, common_1.Post)('startups/:id/metrics'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "updateMetrics", null);
__decorate([
    (0, common_1.Post)('startups/:id/milestones'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "addMilestone", null);
__decorate([
    (0, common_1.Patch)('startups/:id/milestones/:index/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "completeMilestone", null);
__decorate([
    (0, common_1.Get)('pipeline'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getPipelineView", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('activity'),
    __param(0, (0, common_1.Query)('startupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getActivityLog", null);
__decorate([
    (0, common_1.Post)('compare'),
    __param(0, (0, common_1.Body)('startupIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "compareStartups", null);
__decorate([
    (0, common_1.Post)('comparisons/save'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('startupIds')),
    __param(2, (0, common_1.Body)('metrics')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Array, Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "saveComparison", null);
__decorate([
    (0, common_1.Get)('comparisons'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "getSavedComparisons", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('api/portfolio'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map