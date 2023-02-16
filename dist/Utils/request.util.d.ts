import IResponse from '../Interfaces/response.interface';
import Response from './response.util';
export default class Request {
    private readonly response;
    private proxy;
    private defaultHeaders;
    private proxyUrl;
    constructor(response: Response);
    setProxy(proxy: boolean): this;
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
    send(method: string, url: string, options?: Array<any>, headers?: Array<any>, body?: any | null): Promise<IResponse>;
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
    sendFormData(method: string, url: string, options?: Array<any>, headers?: Array<any>, body?: any | null, files?: Array<any>): Promise<IResponse>;
}
//# sourceMappingURL=request.util.d.ts.map