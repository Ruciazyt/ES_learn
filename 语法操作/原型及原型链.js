function Person(){

}
var person1 = new Person()
// __proto__指向创建它的对象的prototype
// constructor指向创建人
// 那么prototype指向谁呢？似乎不指向谁，就是一个属性，原型链的头节点,存储的是原型对象，Function对象继承自Function.prototype
console.log(person1.__proto__==Person.prototype)
console.log(person1.constructor == Person)
console.log(Person.__proto__ ==Function.prototype)
console.log(Person.constructor == Function)
console.log(person1.constructor.prototype == Person.prototype)
console.log(Person.prototype)
console.log(Person.constructor)

// avaScript引擎是个工厂。
// 最初，工厂做了一个最原始的产品原型。
// 这个原型叫Object.prototype，本质上就是一组无序key-value存储（{}）

// 之后，工厂在Object.prototype的基础上，研发出了可以保存一段“指令”并“生产产品”的原型产品，叫函数。
// 起名为Function.prototype，本质上就是[Function: Empty]（空函数）

// 为了规模化生产，工厂在函数的基础上，生产出了两个构造器：
// 生产函数的构造器叫Function，生产kv存储的构造器叫Object。

// 你在工厂定制了一个产品，工厂根据Object.prototype给你做了一个Foo.prototype。
// 然后工厂发现你定制的产品很不错。就在Function.prototype的基础上做了一个Foo的构造器，叫Foo。

// 工厂在每个产品上打了个标签__proto__，以标明这个产品是从哪个原型生产的。
// 为原型打了个标签constructor，标明哪个构造器可以依照这个原型生产产品。(Person就是一个person1的构造器，Function是Person的构造器)
// 为构造器打了标签prototype，标明这个构造器可以从哪个原型生产产品。

// 所以，我觉得先有Function还是Object，就看工厂先造谁了。其实先做哪个都无所谓。因为在你定制之前，他们都做好了。

