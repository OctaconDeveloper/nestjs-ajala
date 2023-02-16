"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const FileSystem = __importStar(require("fs"));
const env = __importStar(require("env-var"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Log {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.logPath = env.get('GLADE_LOG_PATH').asString() || 'logs';
        this.app = env.get('APP_NAME').asString() || 'Core'; //come from env
        this.env = env.get('APP_ENV').asString() || 'development'; //come from env
    }
    /**
     * Set log ref
     * @param logRef
     * @returns this
     */
    setLogRef(logRef) {
        this.logRef = logRef;
        return this;
    }
    /**
     * Passes the log through Monolog to store in log files.
     *
     * @param $data  The payload to log
     * @param $type  Is the Log an Error or or Info
     */
    send(data, type) {
        switch (type) {
            case 'error':
                this.logError(data);
                break;
            case 'info':
                this.logInfo(data);
                break;
            default: this.logError(data);
        }
    }
    /**
     * Log into error.log file
     * @param data
     */
    logError(data) {
        this.logWritter(this.getFilePath('error'), this.format('error', data));
    }
    /**
     * Log into info.log file
     * @param data
     */
    logInfo(data) {
        this.logWritter(this.getFilePath('info'), this.format('info', data));
    }
    /**
     * get formatted file path
     * @param type
     * @returns string
     */
    getFilePath(type) {
        return `${this.logPath}/${(this.app.replace(" ", "")).toLowerCase()}-${(new Date()).toISOString().split('T')[0]}-ajala-glade-${type}.log`;
    }
    /**
     * Write into file
     * @param filePath
     * @param data
     */
    async logWritter(filePath, data) {
        //check if folder exists
        if (!FileSystem.existsSync(this.logPath)) {
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
        }
        else {
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
    format(level, record) {
        //format
        // [ appname :: environment] ajalaRef day, time  Log level    data
        return `[${this.app} :: ${this.env}] ${this.logRef} - ${(new Date()).toLocaleDateString()}, ${(new Date()).toLocaleTimeString()}  LOG[${level.toUpperCase()}] ${JSON.stringify(record)}`;
    }
}
exports.Log = Log;
//# sourceMappingURL=log.util.js.map