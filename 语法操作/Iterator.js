// JS 表示集合的数据结构   数组 对象 （JS） Map Set（ES6）
// Iterator是一个接口，数据结构只要部署了这个接口就可以进行遍历操作。
// 内部通过next()进行遍历，返回（value done：done表示是否结束）

let arr = ['a','b','c']
let iter = arr[Symbol.iterator]();

console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())

// 类部署Iterator的方法
class RangeIterator{
    constructor(start,stop){
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator](){return this;}

    next(){
        var value = this.value;
        if(value<this.stop){
            this.value++;
            return {done:false,value:value}
        }
        else{
            return{done:true,value:undefined}
        }
    }
}

function range(start,stop){
    return new RangeIterator(start,stop)
}

for(var value of range(0,3)){
    console.log(value)
}

// ES6 数组 Map Set 都有的方法
for(let pair of arr.entries()){
    console.log(pair)
}
for(let pair of arr.values()){
    console.log(pair)
}
for(let pair of arr.keys()){
    console.log(pair)
}

// 循环的写法  for(;;;) forEach , for(... in ... ), for (... of ... )
