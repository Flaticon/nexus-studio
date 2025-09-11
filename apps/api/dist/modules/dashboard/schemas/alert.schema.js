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
exports.AlertSchema = exports.Alert = exports.AlertCategory = exports.AlertType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var AlertType;
(function (AlertType) {
    AlertType["CRITICAL"] = "critical";
    AlertType["WARNING"] = "warning";
    AlertType["INFO"] = "info";
    AlertType["SUCCESS"] = "success";
})(AlertType || (exports.AlertType = AlertType = {}));
var AlertCategory;
(function (AlertCategory) {
    AlertCategory["FINANCIAL"] = "financial";
    AlertCategory["PERFORMANCE"] = "performance";
    AlertCategory["TEAM"] = "team";
    AlertCategory["DEADLINE"] = "deadline";
    AlertCategory["SYSTEM"] = "system";
})(AlertCategory || (exports.AlertCategory = AlertCategory = {}));
let Alert = class Alert {
    title;
    message;
    type;
    category;
    startupId;
    isRead;
    isDismissed;
    actionUrl;
    actionLabel;
    metadata;
    expiresAt;
};
exports.Alert = Alert;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Alert.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Alert.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: AlertType }),
    __metadata("design:type", String)
], Alert.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: AlertCategory }),
    __metadata("design:type", String)
], Alert.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Alert.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Alert.prototype, "isRead", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Alert.prototype, "isDismissed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Alert.prototype, "actionUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Alert.prototype, "actionLabel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Alert.prototype, "metadata", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Alert.prototype, "expiresAt", void 0);
exports.Alert = Alert = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Alert);
exports.AlertSchema = mongoose_1.SchemaFactory.createForClass(Alert);
//# sourceMappingURL=alert.schema.js.map