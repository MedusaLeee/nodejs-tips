/**
 * Created by lijianxun on 2017/3/28.
 */
const Readable = require('stream').Readable;

// 构造迭代器
const iterator = ((limit) => {
  return {
    next: () => {
      if (limit--) {
        return {done: false, value: limit + Math.random()}
      }
      return {done: true}
    }
  }
})(100000);

class IteratorReadable extends Readable {
  constructor(iterator) {
    super();
    this.iterator = iterator
  }

  // 子类需要实现该方法
  // 这是生产数据的逻辑
  _read() {
    const res = this.iterator.next();
    if (res.done) {
      // 数据源已枯竭，调用`push(null)`通知流
      return this.push(null);
    }
    // 通过`push`方法将数据添加到流中
    this.push(res.value + '\n');
  }
}

const readable = new IteratorReadable(iterator);

// 监听`data`事件，一次获取一个数据
readable.on('data', data => process.stdout.write(data));

// 所有数据均已读完
readable.on('end', () => process.stdout.write('DONE'));

// 以上还有另外一种写法, 直接通过pipe方法将可写流传入标准输出流
//readable.on('readable', () => {
//  readable.pipe(process.stdout);
//});

