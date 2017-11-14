/// <reference path="../src/List.ts" />

let array = new Linq.List<string>();
array.push("鞍山");
array.push("大连");
array.push("丹东");
array.push("辽阳");
array.push("河池");
let newArray = array.Where(d=>d == "鞍山").ToArray();
for(let i in newArray){
    console.log(newArray[i]);
}