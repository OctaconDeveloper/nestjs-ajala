import Request from "./Utils/request.util";
import IResponse from "./Interfaces/response.interface";
import InternalService from "./Utils/internal-service.util";
export declare class AjalaService {
    private readonly internalService;
    private readonly request;
    constructor(internalService: InternalService, request: Request);
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
    post(url: string, headers: any, body: any, proxy: boolean, options: any, files: Array<any[]>): Promise<any>;
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
    put(url: string, headers: any, body?: any, proxy?: boolean, options?: any): Promise<IResponse>;
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
    get(url: string, headers: any, body?: any, proxy?: boolean, options?: any): Promise<IResponse>;
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
    head(url: string, headers: any, body?: any, proxy?: boolean, options?: any): Promise<IResponse>;
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
    delete(url: string, headers: any, body?: any, proxy?: boolean, options?: any): Promise<IResponse>;
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
    patch(url: string, headers: any, body?: any, proxy?: boolean, options?: any): Promise<IResponse>;
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
    private processRequest;
    /**
     *  Sort file functions
     *
     * @param body
     * @param files
     * @returns
     */
    private sortFile;
    /**
     * Prepare file function
     *
     * @param filePath
     * @returns
     */
    private prepareFile;
}
//# sourceMappingURL=ajala.service.d.ts.map