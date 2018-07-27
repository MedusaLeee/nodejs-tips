# NodeJs v10.0.0 Promise API

## 测试Node版本

v10.7.0

### 警告

Promise化的fs API和支持Async Iterators的stream API都是实验性质的。

> The fs.promises API is experimental

> Readable[Symbol.asyncIterator] is an experimental feature. This feature could change at any time


## Promise化的fs API

```
    const fs = require('fs').promises;

    (async () => {
        try {
            const md = await fs.readFile(`${__dirname}/Readme.md`, 'utf-8');
            console.log(md);
        } catch (e) {
            throw e;
        }
    })();
```

## 支持Async Iterators的stream API

```
    const readStream = fs.createReadStream(`${__dirname}/Readme.md`, 'utf-8');
    (async () => {
        // for await 遍历异步迭代器 Async Iterators
        for await (const chunk of readStream) {
            // 处理 chunk
        }
    })();
```
