export default class Logger {
    private static instance: Logger;
    private level = 'info';
    private levels = ['tracer', 'debug', 'info', 'warn', 'error', 'fatal'];

    private constructor() {}

    tracer(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('tracer')) console.log(`TRACER: ${message}`, data);
    }

    debug(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('debug')) console.log(`DEBUG: ${message}`, data);
    }

    info(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('info')) console.log(`INFO: ${message}`, data);
    }

    warn(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('warn')) console.log(`WARN: ${message}`, data);
    }

    error(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('error')) console.log(`ERROR: ${message}`, data);
    }

    fatal(message: string, data: any) {
        const levels = this.levels.slice(this.levels.indexOf(this.level));
        if(levels.includes('fatal')) console.log(`FATAL: ${message}`, data);
    }

    setLevel(level: string) {
        this.level = level;
    }

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
}
