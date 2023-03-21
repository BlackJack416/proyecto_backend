import log4js from 'log4js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

log4js.configure({
    appenders: {
        console: { type: 'console' },
        warnings: {
            type: 'file',
            filename: path.join(process.cwd(), './logs/warn.log'),
        },

        errors: {
            type: 'file',
            filename: path.join(process.cwd(), './logs/error.log'),
        },
        loggerConsole: {
            type: 'logLevelFilter',
            appender: 'console',
            level: 'info',
        },
        loggerWarns: {
            type: 'logLevelFilter',
            appender: 'warnings',
            level: 'warn',
        },
        loggerErrors: {
            type: 'logLevelFilter',
            appender: 'errors',
            level: 'error',
        },
    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'all' },
        custom: {
            appenders: ['loggerConsole', 'loggerWarns', 'loggerErrors'],
            level: 'all',
        },
    },
})

let logger = null

if (process.env.NODE_ENV === 'production') {
    logger = log4js.getLogger('prod');
} else {
    logger = log4js.getLogger();
}

export default logger