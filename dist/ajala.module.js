"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjalaModule = void 0;
const log_util_1 = require("./Utils/log.util");
const common_1 = require("@nestjs/common");
const request_util_1 = __importDefault(require("./Utils/request.util"));
const axios_1 = require("@nestjs/axios");
const response_util_1 = __importDefault(require("./Utils/response.util"));
const ajala_service_1 = require("./ajala.service");
const internal_service_util_1 = __importDefault(require("./Utils/internal-service.util"));
let AjalaModule = class AjalaModule {
};
AjalaModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [ajala_service_1.AjalaService, internal_service_util_1.default, request_util_1.default, response_util_1.default, log_util_1.Log],
        exports: [ajala_service_1.AjalaService]
    })
], AjalaModule);
exports.AjalaModule = AjalaModule;
//# sourceMappingURL=ajala.module.js.map