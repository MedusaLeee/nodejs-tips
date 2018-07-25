# 手写Promise

## Promises/A+ 规范

[规范连接](https://promisesaplus.com/)

* Promise存在三个状态（state）pending、fulfilled、rejected

* pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）

* 成功时，不可转为其他状态，且必须有一个不可改变的值（value）

* 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）

* new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。

* new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。

* 若是executor函数报错 直接执行reject();

### 实现

* [简单Promise](./myPromise-v1.js)
