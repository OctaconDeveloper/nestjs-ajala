import { Log } from './log.util';
import { AxiosRequestConfig } from "axios";
import IResponse from '../Interfaces/response.interface';
export default class Response {
    private readonly logger;
    private logRef;
    private requestBody;
    private responseBody;
    private responseStatusCode;
    private headersToSkip;
    private logableHeaders;
    constructor(logger: Log);
    /**
     * Process Incoming request
     *
     * @param IncomingRequest AxiosRequestConfig
     * @param options any
     * @returns Promise<IResponse>
     */
    processRequest(IncomingRequest: AxiosRequestConfig, options?: any): Promise<IResponse>;
    /**
     * Logs request errors that are axios related
     *
     * @param exception
     * @returns
     */
    private clientException;
    /**
     * Logs request errors that are not axios related
     *
     * @param exception
     * @returns
     */
    private requestException;
    private createReference;
}
//# sourceMappingURL=response.util.d.ts.map