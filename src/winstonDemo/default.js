/*
  基本使用
 */
const winston = require('winston');

const transportConsole = new winston.transports.Console({ json: false, timestamp: true, prettyPrint: true, colorize: true, level: 'debug' });
const transportFileDebug = new winston.transports.File({ filename: __dirname + '/logs/debug.log', json: true, level: 'debug' });

const logger = new (winston.Logger)({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    },
    transports: [
        transportConsole,
        transportFileDebug
    ],
    exceptionHandlers: [
        transportConsole,
        transportFileDebug
    ],
    exitOnError: false
});

winston.addColors({
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
});

logger.debug('debug message');
logger.info('info message');
logger.warn('warn message');
logger.error('error message');