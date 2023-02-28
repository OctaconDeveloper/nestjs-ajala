import { Log } from './log.util';
import axios, { AxiosRequestConfig } from "axios";
import { forwardRef, Inject } from '@nestjs/common';
import IResponse from '../Interfaces/response.interface';

export default class Response {

    private logRef: string;
    private requestBody: any;
    private responseBody: any;
    private responseStatusCode: any;
    private headersToSkip: Array<string>;
    private logableHeaders: any;

    constructor(
        @Inject(forwardRef(() => Log))
        private readonly logger: Log
    ) {
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
    async processRequest(IncomingRequest: AxiosRequestConfig, options?: any): Promise<IResponse> {

        const url = new URL(IncomingRequest.url as string);

        this.requestBody = {
            headers: IncomingRequest.headers,
            method: IncomingRequest.method,
            body: IncomingRequest.data,
            url: {
                host: IncomingRequest,
                port: url.port,
                schema: url.protocol,
                query: url.search,
                path: url.pathname
            }
        }

        try {
            const response = await axios(IncomingRequest);
            this.responseBody = { headers: response.headers, data: response.data, code: response.status }
            this.responseStatusCode = response.status;
            this.logger.send(
                { "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": "ok", "request": this.requestBody },
                'info'
            );
        } catch (exception: any) {
            this.responseStatusCode = exception.response?.status || '400';

            if (axios.isAxiosError(exception)) {
                this.responseBody = this.clientException(exception)
            }

            this.responseBody = this.requestException(exception)
        }

        return {
            "statusCode": this.responseStatusCode,
            "response": this.prepareLog(this.responseBody),
            "request": this.prepareLog(this.requestBody),
            "logRef": this.logRef
        };
    }


    /**
     * Logs request errors that are axios related
     *  
     * @param exception 
     * @returns 
     */
    private clientException(exception: any) {
        this.logger.send({ "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": exception.response?.data, "request": this.requestBody }, 'error');
        return { headers: exception.response.headers, body: exception.response?.data, code: this.responseStatusCode }
    }

    /**
     * Logs request errors that are not axios related
     * 
     * @param exception 
     * @returns 
     */
    private requestException(exception: any) {
        this.logger.send(
            { "logRef": this.logRef, "statusCode": this.responseStatusCode, "response": exception.response?.data, "request": this.requestBody },
            'error'
        );
        return { headers: exception.response.headers, body: exception.response?.data, code: this.responseStatusCode }
    }


    private createReference(prefix: string, length: number): string {
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

    private prepareLog(requestBody: any) {

        const defaultHeaders = requestBody.headers;

        this.logableHeaders = defaultHeaders
        this.headersToSkip.forEach(header => {
            delete this.logableHeaders[header]
        })
        requestBody.headers = this.logableHeaders
        return requestBody
    }
}

