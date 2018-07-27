// 用构造函数 声明 属性和方法
function DOG(name){

    this.name = name;

    this.species = '犬科';
}

// 然后，生成两个实例对象：
const dogA = new DOG('大毛');

const dogB = new DOG('二毛');

// 这两个对象的species属性是独立的，修改其中一个，不会影响到另一个。
console.log('dogA:', dogA.species); // 犬科
dogA.species = '猫科';
console.log('dogA:', dogA.species); // 猫科，dogA受影响
console.log('dogB:', dogB.species); // 犬科，不受dogA的影响

// 原型链属性声明，实例共享原型链属性
function DOG2(name){
    this.name = name;
}
// 将species属性放入原型链中
DOG2.prototype = { species : '犬科' };


const dogA2 = new DOG2('大毛');
const dogB2 = new DOG2('二毛');

console.log('dogA2: ', dogA2.species); // 犬科
console.log('dogB2: ', dogB2.species); // 犬科

DOG2.prototype.species = '猫科'; // 更改原型链属性，dogA2 dogB2 都受影响

console.log('dogA2: ', dogA2.species); // 猫科
console.log('dogB2: ', dogB2.species); // 猫科


function Father(){
    this.property = true;
}
Father.prototype.getFatherValue = function(){
    return this.property;
};
function Son(){
    this.sonProperty = false;
}
// 继承 Father
// Son.prototype被重写,导致Son.prototype.constructor也一同被重写
// 此时instance.constructor指向的是Father,这是因为Son.prototype中的constructor被重写的缘故
Son.prototype = new Father();
Son.prototype.getSonValue = function(){
    return this.sonProperty;
};
const instance = new Son();
console.log(instance.getFatherValue());// true
console.log(instance.getSonValue());// true

console.log(instance instanceof Object);// true
console.log(instance instanceof Father);// true
console.log(instance instanceof Son);// true









