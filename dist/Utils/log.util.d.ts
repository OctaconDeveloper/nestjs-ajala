/// <reference types="node" />
import * as FileSystem from 'fs';
type FileSystem = typeof FileSystem;
export declare class Log {
    fileSystem: FileSystem;
    private readonly app;
    private readonly env;
    private logRef;
    private readonly logPath;
    loggerConfig: any;
    constructor(fileSystem: FileSystem);
    /**
     * Set log ref
     * @param logRef
     * @returns this
     */
    setLogRef(logRef: string): this;
    /**
     * Passes the log through Monolog to store in log files.
     *
     * @param $data  The payload to log
     * @param $type  Is the Log an Error or or Info
     */
    send(data: Record<string, any>, type: 'error' | 'info'): void;
    /**
     * Log into error.log file
     * @param data
     */
    private logError;
    /**
     * Log into info.log file
     * @param data
     */
    private logInfo;
    /**
     * get formatted file path
     * @param type
     * @returns string
     */
    private getFilePath;
    /**
     * Write into file
     * @param filePath
     * @param data
     */
    private logWritter;
    /**
     * Format log display
     * @param level
     * @param record
     * @returns string
     */
    format(level: string, record: any): string;
}
export {};
//# sourceMappingURL=log.util.d.ts.map