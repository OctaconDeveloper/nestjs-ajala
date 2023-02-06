import * as _ from 'lodash';
import axios, {AxiosRequestConfig} from "axios";



class Response{


    public async  processRequest(axiosRequest:AxiosRequestConfig, options ?: any){
        const logRef: string = _.uniqueId("ajala").replace('.', '');

        const url = new URL(axiosRequest?.url as unknown as URL)
        const requestBody = {
            headers :  axiosRequest.headers,
            method : axiosRequest.method,
            body : axiosRequest.data,
            url : {
                host : axiosRequest,
                port : url.port,
                schema : url.protocol,
                query : url.search,
                path : url.pathname
            }
        }

        let responseBody ={}
        try {

            const response = await axios(axiosRequest);
            responseBody = { headers :  response.headers, data : response.data, code : response.status}
            // add Log here

        }catch (error ){
            if (axios.isAxiosError(error)){
                responseBody = {headers : error.response?.headers, data : error.response?.data, code : error.response?.status}
            }
        }
        return responseBody

    }
}

const responseObject = new Response()
export default  responseObject