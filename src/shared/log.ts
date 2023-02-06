import {GLADE_LOG_PATH} from "./env.helper";
import {createLogger} from "@livy/logger";
import {FileHandler} from '@livy/file-handler'
import {JsonFormatter} from "@livy/json-formatter";


export class Log{

    private readonly app: string
    private readonly logPath;


    constructor(app : string , logRef : string) {
         this.logPath = (GLADE_LOG_PATH && GLADE_LOG_PATH.length > 0) ? GLADE_LOG_PATH : "";
         this.app = app
    }




    public send(data: Record<string, any>, type : 'error' | 'info'){
        switch (type){
            case 'error':
              const errorLogger =  createLogger(this.app, {
                    handlers: [new FileHandler(this.logPath + '/ajala-glade/error.log', { level: 'error',formatter: new JsonFormatter() })]
                })
                errorLogger.info(JSON.stringify(data))
                break;
            case "info":
                const infoLogger =  createLogger(this.app, {
                    handlers: [new FileHandler(this.logPath + '/ajala-glade/info.log', { level: 'info', formatter: new JsonFormatter() })]
                })
                infoLogger.info(JSON.stringify(data))
                break
        }
    }
}