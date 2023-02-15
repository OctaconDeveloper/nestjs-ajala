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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_util_1 = require("./log.util");
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
let Response = class Response {
    constructor(logger) {
        this.logger = logger;
        this.logRef = this.createReference("ajala", 32);
        this.headersToSkip = ['shared-token', 'x-api-key', 'Authorization', 'refresh_token', 'token'];
        this.logger = this.logger.setLogRef(this.logRef);
    }
    /**
     * Process Incoming request
     *
     * @param IncomingRequest AxiosRequestConfig
     * @param options any
     * @returns Promise<IResponse>
     */
    async processRequest(IncomingRequest, options) {
        var _a;
        //Skip headers taht hold sensitive data;
        this.logableHeaders = IncomingRequest.headers;
        this.headersToSkip.forEach(header => {
            delete this.logableHeaders[header];
        });
        const url = new URL(IncomingRequest.url);
        this.requestBody = {
            headers: this.logableHeaders,
            method: IncomingRequest.method,
            body: IncomingRequest.data,
            url: {
                host: IncomingRequest,
                port: url.port,
                schema: url.protocol,
                query: url.search,
                path: url.pathname
            }
        };
        try {
            const response = await (0, axios_1.default)(IncomingRequest);
            this.responseBody = { headers: response.headers, data: response.data, code: response.status };
            this.responseStatusCode = response.status;
            this.logger.send({ "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": "ok", "request": this.requestBody }, 'info');
        }
        catch (exception) {
            this.responseStatusCode = ((_a = exception.response) === null || _a === void 0 ? void 0 : _a.status) || '400';
            if (axios_1.default.isAxiosError(exception)) {
                this.responseBody = this.clientException(exception);
            }
            this.responseBody = this.requestException(exception);
        }
        return {
            "statusCode": this.responseStatusCode,
            "response": this.responseBody,
            "request": this.requestBody,
            "logRef": this.logRef
        };
    }
    /**
     * Logs request errors that are axios related
     *
     * @param exception
     * @returns
     */
    clientException(exception) {
        var _a, _b, _c;
        this.logger.send({ "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": (_a = exception.response) === null || _a === void 0 ? void 0 : _a.data, "request": (_b = exception.response) === null || _b === void 0 ? void 0 : _b.headers }, 'error');
        return { headers: this.requestBody, data: (_c = exception.response) === null || _c === void 0 ? void 0 : _c.data, code: this.responseStatusCode };
    }
    /**
     * Logs request errors that are not axios related
     *
     * @param exception
     * @returns
     */
    requestException(exception) {
        var _a, _b, _c, _d, _e;
        this.logger.send({ "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": (_a = exception.response) === null || _a === void 0 ? void 0 : _a.data, "request": (_b = exception.response) === null || _b === void 0 ? void 0 : _b.headers }, 'error');
        return { headers: (_c = exception.response) === null || _c === void 0 ? void 0 : _c.headers, data: (_d = exception.response) === null || _d === void 0 ? void 0 : _d.data, code: (_e = exception.response) === null || _e === void 0 ? void 0 : _e.status };
    }
    createReference(prefix, length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return `${prefix}_${result}`;
    }
};
Response = __decorate([
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => log_util_1.Log))),
    __metadata("design:paramtypes", [log_util_1.Log])
], Response);
exports.default = Response;
//# sourceMappingURL=response.util.js.map