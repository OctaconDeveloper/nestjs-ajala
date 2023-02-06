import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

import Response from './response'
export class Request{

    private proxy: boolean;

    constructor(proxy: boolean) {
        this.proxy = proxy;
    }




    async send(method: string, url: string,  headers: any = {}, body: any = null, options?: AxiosRequestConfig,): Promise<any> {
        if (this.proxy) {

            return await  Response.processRequest({
                url : 'https://proxy.glade.ng',
                method : method,
                headers : {
                    ...headers,
                            'User-Agent': 'Ajala/0.1',
                            'Content-Type': 'application/json',
                    options
                },data : body
            })
        } else {
            return await  Response.processRequest({
                url : url,
                method : method,
                headers : {
                    ...headers,
                    'User-Agent': 'Ajala/0.1',
                    'Content-Type': 'application/json',
                    options
                },data : body
            })
        }
    }



    async sendFormData(
        method: string,
        url: string,
        headers: any = {},
        body: any = null,
        files: any = [],
        options?: AxiosRequestConfig
    ): Promise<any> {
        if (this.proxy) {

            return await  Response.processRequest({
                url : 'https://proxy.glade.ng',
                method : method,
                headers : {
                    ...headers,
                    'User-Agent': 'Ajala/0.1',
                    'Content-Type': 'application/json',
                    options
                },data : body
            })

            // return axios.post('https://proxy.glade.ng', payload, {
            //     headers: {
            //         'User-Agent': 'Ajala/0.1',
            //         'Content-Type': 'application/json',
            //     },
            // });
        } else {
            if (files && files.length > 0) {
                headers['Content-Type'] = 'multipart/form-data';
                let formData= new FormData();
                files.forEach((file: any) => {
                    formData.append(file.name, file.data, file.name);
                });
                body =  formData
            }

            return await  Response.processRequest({
                url : url,
                method : method,
                headers : {
                    ...headers,
                    'User-Agent': 'Ajala/0.1',
                    'Content-Type': 'application/json',
                    options
                },data : body
            })

           // return axios.request({ method, url, headers, data: body, ...options });
        }
    }

}