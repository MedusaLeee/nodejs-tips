/**
 * Created by lijianxun on 2017/3/29.
 */
const Writable = require('stream').Writable;

class GreenStream extends Writable {
  constructor() {
    super();
  }

  /*
   需要实现_write方法
   chunk <String> | <Buffer> 要写入的数据
   encoding <String> 如果 chunk 是字符串，这里指定字符编码
   callback <Function> 缓冲数据输出时的回调函数
   参考：http://nodejs.cn/api/stream.html#stream_writable_write_chunk_encoding_callback
   */
  _write(chunk, encoding, callback) {
    // 适用ANSI编码序列来给数据添加绿色标识
    process.stdout.write('\u001b[32m' + chunk + '\u001b[39m');
    callback();
  }
}

// 执行本文件后在控制台输入要传入的数据，会将输入的数据变成绿色文字输出
process.stdin.pipe(new GreenStream());

// 可以执行如下语句测试
//cat src/stream/json.txt | node src/stream/greenWriteStream.js

