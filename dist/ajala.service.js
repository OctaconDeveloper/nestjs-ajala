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
exports.AjalaService = void 0;
const request_util_1 = __importDefault(require("./Utils/request.util"));
const internal_service_util_1 = __importDefault(require("./Utils/internal-service.util"));
const common_1 = require("@nestjs/common");
let AjalaService = class AjalaService {
    constructor(internalService, request) {
        this.internalService = internalService;
        this.request = request;
    }
    /**
     * Handle POST requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @param files
     * @returns Promise<IResponse>
     */
    async post(url, headers = [], body, proxy = false, options = null, files) {
        body = JSON.parse(JSON.stringify(body));
        files = JSON.parse(JSON.stringify(files));
        if (files && files.length > 0) {
            let form = this.sortFile(body, files);
            return this.processRequest('POST', url, options, headers, form, proxy, true);
        }
        return this.processRequest('POST', url, options, headers, body, proxy);
    }
    /**
     * Handle PUT requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @returns Promise<IResponse>
     */
    async put(url, headers = [], body, proxy = false, options) {
        return await this.processRequest('PUT', url, options, headers, body, proxy);
    }
    /**
     * Handle GET requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @returns Promise<IResponse>
     */
    async get(url, headers = [], body, proxy = false, options) {
        return await this.processRequest('GET', url, options, headers, body, proxy);
    }
    /**
     * Handle HEAD requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @returns Promise<IResponse>
     */
    async head(url, headers = [], body, proxy = false, options) {
        return await this.processRequest('HEAD', url, options, headers, body, proxy);
    }
    /**
     * Handle DELETE requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @returns Promise<IResponse>
     */
    async delete(url, headers = [], body, proxy = false, options) {
        return await this.processRequest('DELETE', url, options, headers, body, proxy);
    }
    /**
     * Handle PATCH requests
     *
     * @param url
     * @param headers
     * @param body
     * @param proxy
     * @param options
     * @returns Promise<IResponse>
     */
    async patch(url, headers = [], body, proxy = false, options) {
        return await this.processRequest('PATCH', url, options, headers, body, proxy);
    }
    /**
     * Process requests
     *
     * @param method
     * @param url
     * @param options
     * @param headers
     * @param body
     * @param proxy
     * @param hasFile
     * @returns Promise<IResponse>
     */
    async processRequest(method, url, options, headers, body = null, proxy = false, hasFile = false) {
        url = this.internalService.check(url);
        const request = this.request.setProxy(proxy);
        if (hasFile) {
            return request.sendFormData(method, url, options, headers, null, body);
        }
        return request.send(method, url, options, headers, body);
    }
    /**
     *  Sort file functions
     *
     * @param body
     * @param files
     * @returns
     */
    sortFile(body, files) {
        let postFiles = [];
        let postDataMultipart = {};
        const fileObjectKeys = Object.keys(files);
        fileObjectKeys.forEach(key => {
            postFiles.push(this.prepareFile(files[key]));
        });
        postDataMultipart = Object.assign(Object.assign({}, postFiles), body);
        return postDataMultipart;
    }
    /**
     * Prepare file function
     *
     * @param filePath
     * @returns
     */
    prepareFile(filePath) {
        const filename = filePath.length > 0 ? filePath[0].originalname : filePath.originalname;
        const fieldname = filePath.length > 0 ? filePath[0].fieldname : filePath.fieldname;
        const content = filePath.length > 0 ? filePath[0].buffer : filePath.buffer;
        return { 'name': fieldname, 'contents': content, 'filename': filename };
    }
};
AjalaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => internal_service_util_1.default))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => request_util_1.default))),
    __metadata("design:paramtypes", [internal_service_util_1.default,
        request_util_1.default])
], AjalaService);
exports.AjalaService = AjalaService;
//# sourceMappingURL=ajala.service.js.map