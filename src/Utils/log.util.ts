import * as FileSystem from 'fs';
import * as env from 'env-var';
import { config } from 'dotenv'

config()


type FileSystem = typeof FileSystem

export class Log {
    private readonly app: string
    private readonly env: string
    private logRef: string
    private readonly logPath: string | null;
    public loggerConfig: any;

    constructor(public fileSystem: FileSystem) {
        this.logPath = env.get('GLADE_LOG_PATH').asString() || 'logs'
        this.app = env.get('APP_NAME').asString() || 'Core'; //come from env
        this.env = env.get('APP_ENV').asString() || 'development'; //come from env
    }


    /**
     * Set log ref
     * @param logRef 
     * @returns this
     */
    setLogRef(logRef: string) {
        this.logRef = logRef;
        return this;
    }

    /**
     * Passes the log through Monolog to store in log files.
     *
     * @param $data  The payload to log
     * @param $type  Is the Log an Error or or Info
     */

    public send(data: Record<string, any>, type: 'error' | 'info') {
        switch (type) {
            case 'error': this.logError(data);
                break;
            case 'info': this.logInfo(data)
                break;
            default: this.logError(data)
        }
    }

    /**
     * Log into error.log file
     * @param data 
     */
    private logError(data: Record<string, any>): void {
        this.logWritter(this.getFilePath('error'), this.format('error', data))
    }

    /**
     * Log into info.log file
     * @param data 
     */
    private logInfo(data: Record<string, any>): void {
        this.logWritter(this.getFilePath('info'), this.format('info', data))
    }

    /**
     * get formatted file path
     * @param type 
     * @returns string
     */
    private getFilePath(type: string): string {
        return `${this.logPath}/${(this.app.replace(" ", "")).toLowerCase()}-${(new Date()).toISOString().split('T')[0]}-ajala-glade-${type}.log`
    }


    /**
     * Write into file 
     * @param filePath 
     * @param data 
     */
    private async logWritter(filePath: string, data: any): Promise<void> {
        //check if folder exists
        if (!FileSystem.existsSync(this.logPath)){
            FileSystem.mkdirSync(this.logPath);
        }

        //check if file exists;
        if (FileSystem.existsSync(filePath)) {
            //read content of file
            let content = FileSystem.readFileSync(filePath, "utf-8");
            content = content + '\n' + data;
            FileSystem.writeFileSync(filePath, content, {
                flag: 'w',
            });

        } else {
            FileSystem.writeFileSync(filePath, data, {
                flag: 'w',
            });
        }
    }

    /**
     * Format log display
     * @param level 
     * @param record 
     * @returns string
     */
    format(level: string, record: any): string {
        //format
        // [ appname :: environment] ajalaRef day, time  Log level    data
        return `[${this.app} :: ${this.env}] ${this.logRef} - ${(new Date()).toLocaleDateString()}, ${(new Date()).toLocaleTimeString()}  LOG[${level.toUpperCase()}] ${JSON.stringify(record)}`;
    }
}


