// 解决异步问题
class MyPromise {
    constructor(executor) {
        // state初始状态为 pending
        this.state = 'pending';
        // 成功值
        this.value = undefined;
        // 失败原因
        this.reason = undefined;
        // 由于一个promise可以有多个then方法，所以使用数组存储。
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.state === 'pending') {
                // state 为 fulfilled
                this.state = 'fulfilled';
                // 记录成功的值
                this.value = value;
                this.onResolvedCallbacks.forEach(f=>f());
            }
        };
        let reject = reason => {
            // state改变,reject调用就会失败
            if (this.state === 'pending') {
                // reject调用后，state转化为失败态
                this.state = 'rejected';
                // 储存失败的原因
                this.reason = reason;
                this.onRejectedCallbacks.forEach(f=>f());
            }
        };
        // 如果 executor 抛出异常，执行reject
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        // 当state为fulfilled时，执行onFulfilled，传入成功的值
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        }
        // 当state为rejected时，执行onRejected，传入失败的原因
        if (this.state === 'rejected') {
            onRejected(this.reason);
        }
        // 当状态state为pending时
        if (this.state === 'pending') {
            // onFulfilled push 到成功数组
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value);
            });
            // onRejected push 到失败数组
            this.onRejectedCallbacks.push(() => {
                onRejected(this.value);
            });
        }
    }
}

const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 3000);
    // reject('failed');
});

p1.then((v) => {
    console.log('s: ', v);
}, (v) => {
    console.log('f: ', v);
});
