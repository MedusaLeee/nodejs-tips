# node.js中关于流使用的小技巧

## 流的四种类型

    const Stream = require('stream')

    const Readable = Stream.Readable;
    const Writable = Stream.Writable;
    const Duplex = Stream.Duplex;
    const Transform = Stream.Transform;

使用Stream可实现数据的流式处理

### Readable 可读流

#### 适用场景

当处理大文件压缩、归档、媒体文件和巨大的日志文件等的时候，内存的适用就成了问题。
取代把剩余的文件读到内存中，或许可以使用fs.read配合一个缓冲区，一次读取
固定的长度，但是使用fs.createReadStream可以更优雅的解决这个问题。

#### 详解

注意：Stream.Readable是抽象类，子类要实现_read的方法

创建可读流时，需要继承Readable，并实现_read方法。

* _read方法是从底层系统读取具体数据的逻辑，即生产数据的逻辑。
* 在_read方法中，通过调用push(data)将数据放入可读流中供下游消耗。
* 在_read方法中，可以同步调用push(data)，也可以异步调用。
* 当全部数据都生产出来后，必须调用push(null)来结束可读流。
* 流一旦结束，便不能再调用push(data)添加数据。

可以通过监听data事件的方式消耗可读流。

* 在首次监听其data事件后，readable便会持续不断地调用_read()，通过触发data事件将数据输出。
* 第一次data事件会在下一个tick中触发，所以，可以安全地将数据输出前的逻辑放在事件监听后（同一个tick中）。
* 当数据全部被消耗时，会触发end事件。

示例：

* [读取json文件实例](https://github.com/MedusaLeee/nodejs-tips/blob/master/src/stream/parseJsonFile.js)
* [流式消耗迭代器中的数据](https://github.com/MedusaLeee/nodejs-tips/blob/master/src/stream/iteratorReadable.js)

### Writable 可写流

## 详解

注意：需要实现_write方法

使用write写入时：

* 上游通过调用writable.write(data)将数据写入可写流中。write()方法会调用_write()将data写入底层。
* 在_write中，当数据成功写入底层后，必须调用callback(err)告诉流开始处理下一个数据。
* callback的调用既可以是同步的，也可以是异步的。
* 上游必须调用writable.end(data)来结束可写流，data是可选的。此后，不能再调用write新增数据。
* 在end方法调用后，当所有底层的写操作均完成时，会触发finish事件。

使用pipe管道连接：

如：

* process.stdin.pipe(new GreenStream());
* cat src/stream/json.txt | node src/stream/greenWriteStream.js

示例：

* [简单流对象示例](https://github.com/MedusaLeee/nodejs-tips/blob/master/src/stream/simpleWriteStream.js)
* [继承Writable实现示例](https://github.com/MedusaLeee/nodejs-tips/blob/master/src/stream/greenWriteStream.js)
