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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const response_util_1 = __importDefault(require("./response.util"));
let Request = class Request {
    constructor(response) {
        this.response = response;
        this.proxy = false;
        this.defaultHeaders = {
            'User-Agent': 'Ajala/0.1',
            'Content-Type': 'application/json',
        };
    }
    setProxy(proxy) {
        this.proxy = proxy;
        return this;
    }
    /**
     * Handle send request without files
     *
     * @param method
     * @param url
     * @param options
     * @param headers
     * @param body
     * @returns Promise<IResponse>
     */
    async send(method, url, options, headers, body) {
        if (this.proxy) {
            const payload = {
                method: method,
                url: url,
                options: options,
                headers: Object.assign(Object.assign({}, headers), this.defaultHeaders),
                body: body,
            };
            return await this.response.processRequest({
                url,
                method,
                headers: Object.assign(Object.assign({}, this.defaultHeaders), headers),
                data: payload,
            }, []);
        }
        else {
            return await this.response.processRequest({
                url,
                method,
                headers: Object.assign(Object.assign({}, this.defaultHeaders), headers),
                data: body,
            }, []);
        }
    }
    /**
     * Handle send request with files
     *
     * @param method
     * @param url
     * @param options
     * @param headers
     * @param body
     * @returns Promise<IResponse>
     */
    async sendFormData(method, url, options, headers, body, files) {
        if (this.proxy) {
            const payload = {
                method: method,
                url: url,
                options: options,
                headers: Object.assign(Object.assign({}, headers), this.defaultHeaders),
                body: files,
            };
            return await this.response.processRequest({
                url,
                method,
                headers: Object.assign(Object.assign({}, this.defaultHeaders), headers),
                data: payload,
            }, []);
        }
        else {
            if (files && files.length > 0) {
                body = Object.assign({ body }, files);
                this.defaultHeaders = Object.assign(Object.assign({}, this.defaultHeaders), { 'Content-Type': 'application/json' });
            }
            return await this.response.processRequest({
                url,
                method,
                headers: Object.assign(Object.assign({}, this.defaultHeaders), headers),
                data: body,
            }, []);
        }
    }
};
Request = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [response_util_1.default])
], Request);
exports.default = Request;
//# sourceMappingURL=request.util.js.map