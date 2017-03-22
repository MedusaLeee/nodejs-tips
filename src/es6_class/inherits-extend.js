/**
 * Created by lijianxun on 2017/2/8.
 * nodejs的util.inherits继承demo
 */
let util = require('util');
function Base() {
    this.name = 'base';
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base); // 只会继承原型链中的方法
let objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
let objSub = new Sub();
objSub.showName(); // 子类中 name 会覆盖 父类中的 name
//objSub.sayHello(); // 此行会报错，inherits 不会继承类方法
console.log(objSub);

//http://sentsin.com/web/179.htmls