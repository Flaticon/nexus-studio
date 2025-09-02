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
exports.StartupSchema = exports.Startup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Startup = class Startup {
    name;
    slug;
    stage;
    squad;
    resources;
    kpis;
    status;
};
exports.Startup = Startup;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Startup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Startup.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['idea', 'validation', 'pmf', 'growth', 'scale']
    }),
    __metadata("design:type", String)
], Startup.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            lead: { type: mongoose_2.Types.ObjectId, ref: 'TeamMember' },
            members: [{ type: mongoose_2.Types.ObjectId, ref: 'TeamMember' }]
        }
    }),
    __metadata("design:type", Object)
], Startup.prototype, "squad", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            deck: String,
            demo: String,
            repository: String
        }
    }),
    __metadata("design:type", Object)
], Startup.prototype, "resources", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            name: String,
            current: Number,
            target: Number,
            unit: String,
            lastUpdated: Date
        }]),
    __metadata("design:type", Array)
], Startup.prototype, "kpis", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['active', 'paused', 'archived'],
        default: 'active'
    }),
    __metadata("design:type", String)
], Startup.prototype, "status", void 0);
exports.Startup = Startup = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Startup);
exports.StartupSchema = mongoose_1.SchemaFactory.createForClass(Startup);
//# sourceMappingURL=startup.schema.js.map