/*
  多container及多transport组合
 */
const winston = require('winston');
const moment = require('moment');

const myLogFormatter = function (options) {
    const timestamp = options.timestamp();
    const level = options.level.toUpperCase();
    const message = options.message || '';
    let module = 'default';
    if (options.meta && options.meta.module) {
      module = options.meta.module;
    }
    const formatted = `[${timestamp}] [${level}] ${module} - `;
    if (options.colorize) {
      const colorStr = winston.config.colorize(options.level, formatted);
      return `${colorStr}${message}`;
    }
    return `${formatted}${message}`;
};

const transportConsole = new winston.transports.Console({
    json: false,
    prettyPrint:true,
    colorize: true,
    level:'debug',
    timestamp: function () {
        return moment().format('YYYY-MM-DD HH:MM:ss.SSS');
    },
    formatter: myLogFormatter,
});
const debugTransportFile = new winston.transports.File({
    name: 'full',
    filename: __dirname + '/logs/debug.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});

const serviceTransportFile = new winston.transports.File({
    name: 'service',
    filename: __dirname + '/logs/service.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});

const daoTransportFile = new winston.transports.File({
    name: 'dao',
    filename: __dirname + '/logs/dao.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});

winston.loggers.add('default', {
  transports: [
    transportConsole,
    debugTransportFile
  ],
});

winston.loggers.add('service', {
    transports: [
        transportConsole,
        serviceTransportFile,
        debugTransportFile
    ],
});

winston.loggers.add('dao', {
    transports: [
        transportConsole,
        daoTransportFile,
        debugTransportFile
    ],
});
const defaultLog = winston.loggers.get('default');
const serviceLog = winston.loggers.get('service');
const daoLog = winston.loggers.get('dao');

const getDefaultLogger = (module) => {
  return {
    debug: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      defaultLog.debug.apply(defaultLog, fullParams);
    },
    info: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      defaultLog.info.apply(defaultLog, fullParams);
    },
    warn: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      defaultLog.warn.apply(defaultLog, fullParams);
    },
    error: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      defaultLog.error.apply(defaultLog, fullParams);
    }
  };
};

const getServiceLogger = (module) => {
  return {
    debug: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      serviceLog.debug.apply(serviceLog, fullParams);
    },
    info: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      serviceLog.info.apply(serviceLog, fullParams);
    },
    warn: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      serviceLog.warn.apply(serviceLog, fullParams);
    },
    error: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      serviceLog.error.apply(serviceLog, fullParams);
    }
  };
};

const getDaoLogger = (module) => {
  return {
    debug: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      daoLog.debug.apply(daoLog, fullParams);
    },
    info: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      daoLog.info.apply(daoLog, fullParams);
    },
    warn: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      daoLog.warn.apply(daoLog, fullParams);
    },
    error: (...args) => {
      const meta = { module };
      const fullParams = args.concat(meta);
      daoLog.error.apply(daoLog, fullParams);
    }
  };
};

getDefaultLogger('testDefault1').debug('a', 'b', 'c', 'd');
getDefaultLogger('testDefault2').info('a', 'b', 'c', 'd');
getDefaultLogger('testDefault3').warn('a', 'b', 'c', 'd');
getDefaultLogger('testDefault4').error('a', 'b', 'c', 'd');

getServiceLogger('testService1').debug('a', 'b', 'c', 'd');
getServiceLogger('testService2').info('a', 'b', 'c', 'd');
getServiceLogger('testService3').warn('a', 'b', 'c', 'd');
getServiceLogger('testService4').error('a', 'b', 'c', 'd');

getDaoLogger('testDao1').debug('a', 'b', 'c', 'd');
getDaoLogger('testDao2').info('a', 'b', 'c', 'd');
getDaoLogger('testDao3').warn('a', 'b', 'c', 'd');
getDaoLogger('testDao4').error('a', 'b', 'c', 'd');
