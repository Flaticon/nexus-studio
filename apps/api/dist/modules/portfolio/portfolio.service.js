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
let PortfolioService = class PortfolioService {
    startupModel;
    constructor(startupModel) {
        this.startupModel = startupModel;
    }
    async create(createStartupDto) {
        const createdStartup = new this.startupModel({
            ...createStartupDto,
            squad: {
                lead: createStartupDto.squadLead,
                members: createStartupDto.squadMembers,
            },
        });
        return createdStartup.save();
    }
    async findAll(filters) {
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
    async findOne(id) {
        const startup = await this.startupModel
            .findById(id)
            .populate('squad.lead')
            .populate('squad.members')
            .exec();
        if (!startup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return startup;
    }
    async update(id, updateStartupDto) {
        const updatedStartup = await this.startupModel
            .findByIdAndUpdate(id, { $set: updateStartupDto }, { new: true, runValidators: true })
            .exec();
        if (!updatedStartup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return updatedStartup;
    }
    async updateKPIs(id, kpis) {
        const updatedStartup = await this.startupModel
            .findByIdAndUpdate(id, {
            $set: {
                kpis: kpis.map(kpi => ({
                    ...kpi,
                    lastUpdated: new Date()
                }))
            }
        }, { new: true })
            .exec();
        if (!updatedStartup) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
        return updatedStartup;
    }
    async remove(id) {
        const result = await this.startupModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Startup with ID ${id} not found`);
        }
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(startup_schema_1.Startup.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map