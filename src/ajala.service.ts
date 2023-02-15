import Request from "./Utils/request.util";
import IResponse from "./Interfaces/response.interface";
import InternalService from "./Utils/internal-service.util";
import { forwardRef, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AjalaService {

    constructor(
        @Inject(forwardRef(() => InternalService))
        private readonly internalService: InternalService,
        @Inject(forwardRef(() => Request))
        private readonly request: Request,
    ) {
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
    async post(url: string, headers: Array<any> = [], body: any, proxy: boolean = false, options: any = null, files: Array<any[]>): Promise<any> {
        body = JSON.parse(JSON.stringify(body));
        files = JSON.parse(JSON.stringify(files));
        if(files && files.length > 0) { 
            let form = this.sortFile(body, files);
            return this.processRequest('POST',url, options, headers, form, proxy, true)

        }
        return this.processRequest('POST',url, options, headers, body, proxy)
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
    async put(url: string, headers: Array<any> = [], body?: any, proxy: boolean = false, options?: any): Promise<IResponse> {
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
    public async get(url: string, headers: Array<any> = [], body?: any, proxy: boolean = false, options?: any): Promise<IResponse> {
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
    async head(url: string, headers: Array<any> = [], body?: any, proxy: boolean = false, options?: any): Promise<IResponse> {
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
    async delete(url: string, headers: Array<any> = [], body?: any, proxy: boolean = false, options?: any): Promise<IResponse> {
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
    async patch(url: string, headers: Array<any> = [], body?: any, proxy: boolean = false, options?: any): Promise<IResponse> {
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
    private async processRequest(method: string, url: string, options?: any, headers?: any, body: any = null, proxy: boolean = false, hasFile: boolean = false): Promise<IResponse> {
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
    private sortFile(body?: Array<any>, files?: Array<any>): Array<any> {
        let postFiles: Array<any> = [];
        let postDataMultipart: any = {};

        const fileObjectKeys = Object.keys(files);

        fileObjectKeys.forEach(key => {
            postFiles.push(this.prepareFile(files[key]))
        })

        postDataMultipart = { ...postFiles, ...body}

       return postDataMultipart;

    }


    /**
     * Prepare file function
     * 
     * @param filePath 
     * @returns  
     */
    private prepareFile(filePath): any {
        const filename : string =  filePath.length > 0  ? filePath[0].originalname :filePath.originalname;
        const fieldname : string = filePath.length > 0  ? filePath[0].fieldname: filePath.fieldname;
        const content : string = filePath.length > 0  ? filePath[0].buffer:  filePath.buffer;
        return  {'name' : fieldname, 'contents' : content,'filename' : filename };
     }
}