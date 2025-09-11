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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupSchema = exports.Startup = exports.DocumentType = exports.StartupStatus = exports.StartupStage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var StartupStage;
(function (StartupStage) {
    StartupStage["IDEA"] = "idea";
    StartupStage["VALIDATION"] = "validation";
    StartupStage["PMF"] = "pmf";
    StartupStage["GROWTH"] = "growth";
    StartupStage["SCALE"] = "scale";
})(StartupStage || (exports.StartupStage = StartupStage = {}));
var StartupStatus;
(function (StartupStatus) {
    StartupStatus["ACTIVE"] = "active";
    StartupStatus["PAUSED"] = "paused";
    StartupStatus["ARCHIVED"] = "archived";
})(StartupStatus || (exports.StartupStatus = StartupStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["PITCH_DECK"] = "pitch_deck";
    DocumentType["BUSINESS_PLAN"] = "business_plan";
    DocumentType["FINANCIAL_MODEL"] = "financial_model";
    DocumentType["LEGAL"] = "legal";
    DocumentType["TECHNICAL"] = "technical";
    DocumentType["OTHER"] = "other";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
let Timeline = class Timeline {
    stage;
    date;
    description;
    milestone;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Timeline.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Timeline.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Timeline.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Timeline.prototype, "milestone", void 0);
Timeline = __decorate([
    (0, mongoose_1.Schema)()
], Timeline);
let StartupDocumentSubSchema = class StartupDocumentSubSchema {
    name;
    url;
    type;
    description;
    uploadedAt;
    uploadedBy;
    size;
    mimeType;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: DocumentType }),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], StartupDocumentSubSchema.prototype, "uploadedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "uploadedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], StartupDocumentSubSchema.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], StartupDocumentSubSchema.prototype, "mimeType", void 0);
StartupDocumentSubSchema = __decorate([
    (0, mongoose_1.Schema)()
], StartupDocumentSubSchema);
let Metric = class Metric {
    name;
    value;
    unit;
    target;
    previousValue;
    recordedAt;
    category;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Metric.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Metric.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Metric.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Metric.prototype, "target", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Metric.prototype, "previousValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Metric.prototype, "recordedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Metric.prototype, "category", void 0);
Metric = __decorate([
    (0, mongoose_1.Schema)()
], Metric);
let ActivityLog = class ActivityLog {
    action;
    description;
    userId;
    userName;
    changes;
    timestamp;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "action", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], ActivityLog.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "userName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "changes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], ActivityLog.prototype, "timestamp", void 0);
ActivityLog = __decorate([
    (0, mongoose_1.Schema)()
], ActivityLog);
let Milestone = class Milestone {
    title;
    description;
    dueDate;
    completed;
    completedAt;
    category;
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Milestone.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Milestone.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Milestone.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Milestone.prototype, "completed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Milestone.prototype, "completedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Milestone.prototype, "category", void 0);
Milestone = __decorate([
    (0, mongoose_1.Schema)()
], Milestone);
let Startup = class Startup {
    name;
    slug;
    description;
    logo;
    website;
    industry;
    stage;
    status;
    squad;
    resources;
    documents;
    metrics;
    kpis;
    timeline;
    activityLog;
    milestones;
    keyDates;
    tags;
    metadata;
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
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Startup.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Startup.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Startup.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Startup.prototype, "industry", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: StartupStage,
        default: StartupStage.IDEA
    }),
    __metadata("design:type", String)
], Startup.prototype, "stage", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: StartupStatus,
        default: StartupStatus.ACTIVE
    }),
    __metadata("design:type", String)
], Startup.prototype, "status", void 0);
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
            repository: String,
            documentation: String
        }
    }),
    __metadata("design:type", Object)
], Startup.prototype, "resources", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [StartupDocumentSubSchema], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "documents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Metric], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "metrics", void 0);
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
    (0, mongoose_1.Prop)({ type: [Timeline], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "timeline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [ActivityLog], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "activityLog", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Milestone], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "milestones", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            foundedDate: Date,
            incorporationDate: Date,
            firstRevenue: Date,
            breakEven: Date
        }
    }),
    __metadata("design:type", Object)
], Startup.prototype, "keyDates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Startup.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Startup.prototype, "metadata", void 0);
exports.Startup = Startup = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Startup);
exports.StartupSchema = mongoose_1.SchemaFactory.createForClass(Startup);
exports.StartupSchema.index({ stage: 1, status: 1 });
exports.StartupSchema.index({ 'squad.lead': 1 });
exports.StartupSchema.index({ tags: 1 });
exports.StartupSchema.index({ createdAt: -1 });
//# sourceMappingURL=startup.schema.js.map