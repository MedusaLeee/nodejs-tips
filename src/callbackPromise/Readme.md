# 回调风格的函数与返回Promise的函数相互转化

## 背景

我们现在都是用async/await的编程范式，使用到的callback方法都要进转成返回Promise的方法。

## NodeJs v8.0.0之前

在NodeJs v8.0还没发布的时候我是使用bluebird将在NodeJs的原生的callback方法转成一个返回promise的方法
如`bluebird.fromCallback`，具体的例子见[bluebird-demo](https://github.com/MedusaLeee/bluebird-demo)。

## NodeJs v8.0.0之后

NodeJs v8.0.0之后加入了`util.promisify`方法，将一个遵循异常优先的回调风格的函数， 即 `(err, value) => ... `
回调函数是最后一个参数, 返回一个返回值是一个`promise`版本的函数。

NodeJs v8.2.0之后加入了`util.callbackify`方法，将`async`异步函数(或者一个返回值为 Promise 的函数)转换成遵循
异常优先的回调风格的函数，例如将 `(err, value) => ... `回调作为最后一个参数。在回调函数中, 第一个参
数`err`为`Promise rejected`的原因 (如果`Promise`状态为`resolved`,`err`为`null`),第二个参数
则是`Promise`状态为`resolved`时的返回值。

现在NodeJs的文档中好多模块中的方法都支持使用`promisify`转化，像`fs`、`child_process`、`stream`模块。
并且在文档中都给出了示例和返回参数介绍。

示例：

```
    const util = require('util');
    const readFile = util.promisify(require('fs').readFile);


    (async () => {
        const buffer = await readFile(`${__dirname}/Readme.md`);
        console.log(buffer.toString());
    })();


    const asyncFunc = async () => {
        return 'hello world!';
    };

    const callbackFunc = util.callbackify(asyncFunc);

    callbackFunc((err, ret) => {
        if (err) throw err;
        console.log(ret); // 会打印出hello word！
    });

```



