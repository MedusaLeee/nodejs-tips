# node.js中关于流使用的小技巧

## 流的四种类型

    const Stream = require('stream')

    const Readable = Stream.Readable;
    const Writable = Stream.Writable;
    const Duplex = Stream.Duplex;
    const Transform = Stream.Transform;

使用Stream可实现数据的流式处理

### Readable 可读流

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