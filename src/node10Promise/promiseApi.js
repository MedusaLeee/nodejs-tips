const fs = require('fs');
const pfs = fs.promises;

// fs promise api
(async () => {
    try {
        const md = await pfs.readFile(`${__dirname}/Readme.md`, 'utf-8');
        console.log(md);
    } catch (e) {
        throw e;
    }
})();

// Async Iterators的stream API
(async () => {
    // 创建一个 stream
    const readStream = fs.createReadStream(`${__dirname}/Readme.md`, 'utf-8');
    // for await 遍历异步迭代器 Async Iterators
    for await (const chunk of readStream) {
        console.log(chunk);
        // 处理 chunk
    }
})();


