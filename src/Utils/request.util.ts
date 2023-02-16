import { Injectable } from '@nestjs/common';
import IResponse from '../Interfaces/response.interface';
import Response from './response.util';

@Injectable()
export default class Request {
    private proxy: boolean = false;
    private defaultHeaders: any;
    private proxyUrl:string;

    constructor(private readonly response: Response) {
        this.defaultHeaders = {
            'User-Agent': 'Ajala/0.1',
            'Content-Type': 'application/json',
        };
        this.proxyUrl = "https://proxy.glade.ng"
    }

    setProxy(proxy: boolean)
    {
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
    async send(
        method: string,
        url: string,
        options?: Array<any>,
        headers?: Array<any>,
        body?: any | null,
    ): Promise<IResponse> {
        if (this.proxy) {
            const payload = {
                method: method,
                url: url,
                options: options,
                headers: { ...headers, ...this.defaultHeaders },
                body: body,
            };
            return await this.response.processRequest(
                {
                    url: this.proxyUrl,
                    method,
                    headers: { ...this.defaultHeaders, ...headers },
                    data: payload,
                },
                [],
            );
        } else {
            return await this.response.processRequest(
                {
                    url,
                    method,
                    headers: { ...this.defaultHeaders, ...headers },
                    data: body,
                },
                [],
            );
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
    async sendFormData(
        method: string,
        url: string,
        options?: Array<any>,
        headers?: Array<any>,
        body?: any | null,
        files?: Array<any>,
    ): Promise<IResponse> {
        if (this.proxy) {
            const payload = {
                method: method,
                url: url,
                options: options,
                headers: { ...headers, ...this.defaultHeaders },
                body: files,
            };
            return await this.response.processRequest(
                {
                    url: this.proxyUrl,
                    method,
                    headers: { ...this.defaultHeaders, ...headers },
                    data: payload,
                },
                [],
            );
        } else {
            if (files && files.length > 0) {
                body = {body, ...files};
                this.defaultHeaders = {
                    ...this.defaultHeaders,
                    'Content-Type': 'application/json',
                };
            }
            return await this.response.processRequest(
                {
                    url,
                    method,
                    headers: { ...this.defaultHeaders, ...headers },
                    data: body,
                },
                [],
            );
        }
    }
}
