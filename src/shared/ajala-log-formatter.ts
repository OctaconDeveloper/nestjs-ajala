

export class AjalaLogFormatter{
    private logRef: string;

    constructor(applicationName: string,  extraKey = '', logRef: string, systemName: string,) {

        this.logRef = logRef;
    }


    format(record: any): string {
        record.extra = { logRef: this.logRef };
        return ''
    }
}