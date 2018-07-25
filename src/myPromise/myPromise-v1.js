class MyPromise {
    constructor(executor){
        // state初始状态为 pending
        this.state = 'pending';
        // 成功值
        this.value = undefined;
        // 失败原因
        this.reason = undefined;
        let resolve = value => {
            if (this.state === 'pending') {
                // state 为 fulfilled
                this.state = 'fulfilled';
                // 记录成功的值
                this.value = value;
            }
        };
        let reject = reason => {
            // state改变,reject调用就会失败
            if (this.state === 'pending') {
                // reject调用后，state转化为失败态
                this.state = 'rejected';
                // 储存失败的原因
                this.reason = reason;
            }
        };
        // 如果 executor 抛出异常，执行reject
        try{
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
    }
}

const p1 = new MyPromise((resolve, reject) => {
    // resolve('success');
    reject('failed');
});

p1.then((v) => {
    console.log('s: ', v);
}, (v) => {
    console.log('f: ',v);
});
