// 使用Object.create() 实现继承
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的 prototype。
const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = Object.create(person);

me.name = "Matthew"; // name 是 me 的一个属性，但不是 person的属性
me.isHuman = true; // 继承过来的属性会被覆盖

me.printIntroduction();
// 输出是: My name is Matthew. Am I human? true

// 父类
function Shape() {
    this.x = 0;
    this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// TODO
