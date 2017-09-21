# winston日志框架使用

原来一直是使用`log4js`做日志输出，原来只是输出到标准输出中，用了3年了，一直没换过。现在为了将详细的日志都记录下来，不光输出到标准出，而且根据服务的分层输出到不同的文件中。如：全部的log都输出到debug文件及标准输出中，service层的log输出service.log文件中，dao层的log输出到dao.log文件中，为了防止log文件过大，需按日期切分，如：按天。

## 为何选择winston

1. github start数多，够直接把。
2. 更加灵活，可以灵活的组织transport，来完成比较复杂的日志输出任务。
3. 日志格式为json字符串，方便后期分析，当然可以自定义format.
4. 支持简单的log分析，Profiling。
5. 支持stream Api。
6. 简单Log Query Api，当然无法和专业的日志分析工具比。

## 我要达到的效果

1. 按天生成日志文件。
2. 根据不同的代码分层来产生不同的log输出到不同的文件。
3. 所有分层产生的log不光输出到log文件还要输出到标准输出。
4. 自定义格式化日志输出，输出到标准输出的格式便于读取，输出到log文件的格式便于分析。
5. 可以捕获系统崩溃异常。

## 日志输出方法



## 整合多个transport及封装

格式化输出到标准输出的日志格式。

格式为

> [2017-09-21 23:41:05.122] [DEBUG] - 输出日志的module 日志详细信息

但是在winston中没有可以像`log4js`一样可以定义`category`，为了达到这个效果，我们利用winston的 `meta` 特性来实现这一功能。winston中`log`方法输出的最后一个参数为对象的话，会被解析成 `meta`，我们在`meta`中自定义一个
`module`字段来标记日志来自哪个模块。

```
const myLogFormatter = function (options) {
    const timestamp = options.timestamp();
    const level = options.level.toUpperCase();
    const message = options.message || '';
    let module = 'default';
    // meta中module，标记日志来自哪个模块
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
```

创建标准输出的transport

```
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
```

创建所有日志输出到文件的transport，日志输出到debug.log

```
const debugTransportFile = new winston.transports.File({
    name: 'full',
    filename: __dirname + '/logs/debug.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});
```
service模块专用输出到文件的transport，日志输出到service.log

```
const serviceTransportFile = new winston.transports.File({
    name: 'service',
    filename: __dirname + '/logs/service.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});

```

dao模块专用输出到文件的transport，日志输出到dao.log

```
const daoTransportFile = new winston.transports.File({
    name: 'dao',
    filename: __dirname + '/logs/dao.log',
    json: true,
    level:'debug',
    maxsize: 1024 * 1024 * 10 // 10MB
});

```

为各个`container`添加`transport`。


```
// default container输出日志到标准输出及debug.log文件中
winston.loggers.add('default', {
  transports: [
    transportConsole,
    debugTransportFile
  ],
});
// service container输出日志到标准输出、debug.log及service.log文件中
winston.loggers.add('service', {
    transports: [
        transportConsole,
        serviceTransportFile,
        debugTransportFile
    ],
});
// dao container输出日志到标准输出、debug.log及dao.log文件中
winston.loggers.add('dao', {
    transports: [
        transportConsole,
        daoTransportFile,
        debugTransportFile
    ],
});
```

代理各个`container`的`debug`、`info`等方法，达到可以显示日志来自哪个`module`的功能。

```
const defaultLog = winston.loggers.get('default');
const serviceLog = winston.loggers.get('service');
const daoLog = winston.loggers.get('dao');
// 封装default
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
// 封装service
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
// 封装dao
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
```

封装后如何使用？

比如在我们代码代码的`service`层中的`userService`中打印日志“登录成功”，日志级别为`info`。

getServiceLogger('userService').info('登录成功');

控制台输出为：

	[2017-09-22 00:09:45.026] [INFO] userService - 登录成功
	
此日志会输出在标准输出中、debug.log中及service.log中，日志中写入的控制台输出的略有不同。

写入的日志格式为：

	{"module":"userService","level":"info","message":"登录成功","timestamp":"2017-09-21T16:01:45.026Z"}

	
## 更多功能

我写了几个demo，包括基本使用，多个输出源，捕获系统崩溃错误，按天生成日志文件。代码地址为：

[**winstonDemo**](https://github.com/MedusaLeee/nodejs-tips/tree/master/src/winstonDemo)





