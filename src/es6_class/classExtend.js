/**
 * Created by lijianxun on 2017/3/14.
 */
const events = require('events');


class Base {
    constructor() {
        this.name = 'base';
    }
    sayHello () {
        console.log('Hello ' + this.name);
    };
}

const base = new Base();

base.sayHello();

class Sub extends Base {// 这种写法看着比较顺眼
    constructor() {
        super(); //必须调用父类构造函数
        this.name = 'sub';
    }
}


const sub = new Sub();

sub.sayHello();
