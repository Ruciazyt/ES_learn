// 变化侦测
// 如何收集依赖

// 在data中key读取时，get触发，data中key设置时，set触发
// 依赖（watcher）：用到数据的地方-----getter中收集依赖，setter触发依赖
// function defineReactive(data, key, val){
//     let dep = [] //用来存储依赖
//     Object.defineProperty(data, key, {
//         enumerable:true,
//         configurable: true,
//         get:function(){
//             // 假设依赖保存在window.target上
//             dep.push(window.target)
//             return val;
//         },
//         set:function(newVal){
//             if(val === newVal){return}
//             for(let i=0;i<dep.length;i++){
//                 dep[i](newVal,val)
//             }
//             val = newVal 
//         }
//     })
// }
// 依赖收集封装

// vue通过Object.defineProperty来将对象的key转换成getter/setter的形式来追踪变化，但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性
export default class Dep{
    constructor(){
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub)
    }

    removeSub(sub){
        remove(this.subs,sub)
    }

    depend(){
        if(window.target){
            this.addSub(window.target)
        }
    }

    notify(){
        const subs = this.subs.slice()
        for(let i=0, l =subs.length; i<l;i++){
            subs[i].update()
        }
    }
}
function remove(arr, item){
    if(arr.length){
        const index = arr.indexOf(item)
        if(index>-1){
            return arr.splice(index,1)
        }
    }
}
// ======>重新写define

function defineReactive(data, key, val){
    //递归子属性
    if(typeof val ==='object'){
        new Observer(val)
    }
    let dep = new Dep() //用来存储依赖
    Object.defineProperty(data, key, {
        enumerable:true,
        configurable: true,
        get:function(){
            // 假设依赖保存在window.target上
            dep.depend();
            return val;
        },
        set:function(newVal){
            if(val === newVal){return}
            val = newVal 
            dep.notify()
        }
    })
}
// ====>收集谁，就是值改变后，通知谁。能够处理这样的事务的类，封装一下为Watcher


// watcher封装
vm.$watch('a.b.c',function(newVal, oldVal){
    //dosomething
})

//===>如何实现watcher？
export default class Watcher {
    constructor(vm, expOrFn, cb){
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get
    }
    get(){
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update(){
        const oldValue = this.value
        this.value - this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

// 递归侦测所有key
// 将数据中的所有属性都侦测到
export class Observer{
    constructor (value) {
        this.value = value

        if(!Array.isArray(value)){
            this.walk(value)
        }
    }

    walk(obj){
        const keys = Object.keys(obj)
        for(let i = 0; i<keys.length; i++){
            defineReactive(obj,keys[i],obj[keys[i]])
        }
    }
}

