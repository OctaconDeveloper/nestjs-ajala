import {InternalService} from "./shared/internal-service";
import {Request} from './shared/request'

export class Ajala{


    private useProxy: boolean = false;
    private guzzleOptions: object | null = null;
    private arrayMultiPart: object[] = [];



    private processRequest(   method: string,
                              url: string,
                              options: any,
                              headers: object,
                              body: object | null,
                              proxy: boolean,
                              isMultipart: boolean = false){

        const finalUrl = InternalService.check(url);
        const request = new Request(proxy);
        if (isMultipart){
            return request.sendFormData(method, finalUrl, headers, body, body)
        }
        return  request.send(method, url,headers, body, options )
    }
}