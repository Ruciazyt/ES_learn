//Set 不包含重复元素    对于Set的add操作，使用的是类似===来判断是否重复，值相同，类型不同仍然视为不同
var s = new Set();

[2,3,5,4,5,2,2].map(x=>s.add(x))

for(i of s) {console.log(i)}

//数组去重
var items = new Set([1,2,3,5,6,6]);
var array = Array.from(items)
console.log(array)

function dedupe(array){
    return Array.from(new Set(array));
}

function dedupe2(array){
    return [...new Set(array)]
}
var a = [1,2,3,4,5,5,5,56,6,6,4]
console.log(dedupe2(a))

//Set实现交集与并集
var set1 = new Set([1,2,3])
var set2 = new Set([4,3,2])
var setUnion = new Set([...set1,...set2])
console.log(setUnion)
var setIntersect = new Set([...set1].filter(x=>set2.has(x)))
console.log(setIntersect)
