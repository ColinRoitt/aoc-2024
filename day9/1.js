const fs = require('fs');
// let input = "2333133121414131402".split("");
let input = fs.readFileSync("input", "utf8").split("");
let layout = [];

for(let i = 0; i < input.length; i++) {
  if(i % 2 === 1){
    let value = Number(input[i]);
    for (let j = 0; j < value; j++) {
      layout.push(".");
    }
  }else{
    let id = Math.floor(i / 2);
    let value = Number(input[i]);
    for (let j = 0; j < value; j++) {
      layout.push(id);
    }
  }
}

// console.log(layout.join(""));

// fill up space of 0s moving last el to the front
let n = layout.length;
for(let i = 0; i < n; i++) {
  if(layout[i] === ".") {
    let last = layout.pop();
    while(last === ".") {
      last = layout.pop();
    }
    layout[i] = last;
    // console.log(layout.join(""));
  }
}

// console.log(layout.join(""));

// work out check sum

let sum = 0;

for(let i = 0; i < layout.length; i++) {
  if(layout[i] !== ".") {
    sum += layout[i] * i;
  }
}

console.log(sum);

// part 2

// input = "2333133121414131402".split("");
input = fs.readFileSync("input", "utf8").split("");
layout = [];

for(let i = 0; i < input.length; i++) {
  if(i % 2 === 1){
    let value = Number(input[i]);
    for (let j = 0; j < value; j++) {
      layout.push(".");
    }
  }else{
    let id = Math.floor(i / 2);
    let value = Number(input[i]);
    for (let j = 0; j < value; j++) {
      layout.push(id);
    }
  }
}

console.log(layout);

// fill up space of 0s moving last el to the front
let biggestIDValue = layout[layout.length - 1];
console.log("biggest", biggestIDValue);
// layout = layout.join("");

for(let i = biggestIDValue; i > 0; i--) {

  // find a run of i
  let start = layout.indexOf(i);
  let end = layout.lastIndexOf(i);
  // console.log("start", start, "end", end, layout.slice(start, end + 1).join(""));

  let length = end - start + 1;
  let chunk = layout.slice(start, end + 1);

  let willFit = false;
  let endEmpty = 0;
  let found = 0;
  for(let j = 0; j < layout.length; j++) {
    if(layout[j] === ".") {
      found++;
    }else{
      found = 0;
    }
    if(found === length) {
      endEmpty = j;
      willFit = true;
      break;
    }
  }

  let startEmpty = endEmpty - length + 1;

  // console.log("startEmpty", startEmpty, "endEmpty", endEmpty);
  // console.log(layout.join(""));

  // now if we have enough empty space then we switch the chunk with the empty space
  if(willFit && start >= startEmpty) {
    let part1 = layout.slice(0, startEmpty);
    let part2 = layout.slice(endEmpty + 1, start);
    let part3 = layout.slice(end + 1, layout.length);
    // console.log(part1)
    // console.log(part2)
    // console.log(part3)
    layout = [...part1, ...chunk, ...part2, ...".".repeat(length).split(""), ...part3];
  }
}

console.log(layout.join(""));
console.log("00992111777.44.333....5555.6666.....8888..");

sum = 0;

for(let i = 0; i < layout.length; i++) {
  if(layout[i] !== ".") {
    sum += layout[i] * i;
  }
}

console.log(sum);