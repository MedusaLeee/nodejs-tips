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

读取json文件实例: