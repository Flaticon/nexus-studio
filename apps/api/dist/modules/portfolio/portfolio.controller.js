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
    updateKPIs(id, kpis) {
        return this.portfolioService.updateKPIs(id, kpis);
    }
    remove(id) {
        return this.portfolioService.remove(id);
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
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.Post)('startups/:id/kpis'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "updateKPIs", null);
__decorate([
    (0, common_1.Delete)('startups/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortfolioController.prototype, "remove", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('api/portfolio'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map