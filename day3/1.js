// load input from file
const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').trim().split('\n');

const sets = [];

for(row in input){
  const values = input[row];
  sets.push(values);
}

// find all the mul commandsm calcuclate and then sum results

const reg = /mul\(\d{1,3},\d{1,3}\)/g;
let instructions = [];
for(s of sets){
  const matches = s.matchAll(reg);
  for (const match of matches) {
    instructions.push(match[0]);
  }
}

const output = instructions.map((i) => {
  let [a, b] = i.match(/\d{1,3}/g);
  return a * b;
});

console.log(output.reduce((a, b) => a + b, 0));

// TASK 2

const big_reg = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g;
let instructions_big = [];
for(s of sets){
  let matches = s.matchAll(big_reg);
  for (let match of matches) {
    instructions_big.push(match[0]);
  }
}


let active = true;
const output_big = instructions_big.map((i) => {
  if(i.includes('don\'t')){
    active = false;
  }else{
    if(i.includes('do')){
      active = true;
    }
  }
  if(i.includes('mul') && active){
    let [a, b] = i.match(/\d{1,3}/g);
    return a * b;
  }
  return 0;
});

console.log(output_big.reduce((a, b) => a + b, 0));