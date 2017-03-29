/**
 * Created by lijianxun on 2017/3/29.
 */
const Writable = require('stream').Writable;
// 有些简单的情况下不需要创建一类流，而只是一个流对象
const simpleWritable = Writable();
// 实现_write方法
// 这是将数据写入底层的逻辑
simpleWritable._write = (chunk, encoding, callback) => {
  // 将流中的数据写入底层
  process.stdout.write(chunk.toString().toUpperCase());
  // 写入完成时，调用callback()方法通知流传入下一个数据
  callback();
};

// 所有数据均已写入底层
simpleWritable.on('finish', () => process.stdout.write('DONE \n'));

// 将一个数据写入流中
simpleWritable.write('a' + '\n');
simpleWritable.write('b' + '\n');
simpleWritable.write('c' + '\n');

// 再无数据写入流时，需要调用`end`方法
simpleWritable.end();

