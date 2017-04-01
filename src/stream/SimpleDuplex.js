/**
 * Created by lijianxun on 2017/3/30.
 */
const Duplex = require('stream').Duplex;


const duplex = Duplex();

//实现读取逻辑，此处使用箭头函数会出错，因为箭头函数会自动绑定上级this，也就是外层调用者，
// 箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。
/*duplex._read = () => {
  this._readNum = this._readNum || 0;
  if (this._readNum > 1) {
    this.push(null);
  } else {
    this.push('' + (this._readNum ++ ));
  }
};*/

//实现读取逻辑
duplex._read = function () {
  this._readNum = this._readNum || 0;
  if (this._readNum > 1) {
    this.push(null);
  } else {
    this.push('' + (this._readNum ++ ));
  }
};

//实现写逻辑
duplex._write = (buffer, encoding, callback) => {
  process.stdout.write(`_write ${buffer.toString()}\n`);
  callback();
};

duplex.on('data', data => console.log('onData', data.toString()));

duplex.write('a');
duplex.write('b');

duplex.end();
