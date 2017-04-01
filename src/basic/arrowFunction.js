/**
 * Created by lijianxun on 2017/4/1.
 */
// 箭头函数与普通function函数的区别

// 1. 写法上的区别, 更简短
const arr = [1, 2];

const arr2 = arr.map(function (it) {
  return it;
});

// 只有在方法的参数只有一个的时候才能省略参数的小括号()，只有方法体只有一行的时候才能省略方法体的大括号{}
const arr3 = arr.map(it => it); // 相当于 (it) => { return it; }

// 2. 不绑定this, 最重要的

/*
 在箭头函数出现之前，每个新定义的函数都有其自己的 this 值（例如，构造函数的 this 指向了一个新的对象；
 严格模式下的函数的 this 值为 undefined；如果函数是作为对象的方法被调用的，则其 this 指向了那个
 调用它的对象）。在面向对象风格的编程中，这被证明是非常恼人的事情。
 */

function Person() {
  // 构造函数 Person() 定义的 this 就是新实例对象自己
  this.age = 0;
  setInterval(function growUp() {
    // 在非严格模式下，growUp() 函数定义了其内部的 this
    // 为全局对象, 不同于构造函数Person()的定义的 this
    this.age++;
  }, 1000);
}

const p = new Person();

/*
 箭头函数会捕获其所在上下文的  this 值，作为自己的 this 值.
 使用 call 或 apply 调用时，由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调
 用一个函数时，只是传入了参数而已，对 this 并没有什么影响。
 */
const adder = {
  base : 1,

  add : function(a) {
    const f = v => v + this.base;
    return f(a);
  },

  addCall: function(a) {
    const f = v => v + this.base;
    const b = {
      base : 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1)); // 输出 2
console.log(adder.addCall(1)); // 仍然输出 2（而不是3）


// 3. 不绑定 arguments

/*
 箭头函数不会在其内部暴露出 arguments 对象： arguments.length, arguments[0], arguments[1] 等等，
 都不会指向箭头函数的 arguments，而是指向了箭头函数所在作用域的一个名为 arguments 的值（如果有的话，否则，
 就是 undefined。)
 */

function fun() {
  return arguments[0];
}

fun(1); // 1

const arguments = 42;
const arr = () => arguments;

arr(); // 42

function foo() {
  const f = () => arguments[0];
  return f(2);
}

foo(1); // 1