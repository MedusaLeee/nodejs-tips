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
