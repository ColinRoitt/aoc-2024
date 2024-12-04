// load input from file
const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').trim().split('\n');

const list1 = [];
const list2 = [];

for(row in input){
  const [num1, num2] = input[row].split('   ');
  list1.push(parseInt(num1));
  list2.push(parseInt(num2));
}

// sort lists in ascending order
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

// find dif between each value
const distances = [];

for(let i = 0; i < list1.length; i++){
  distances.push(Math.abs(list1[i] - list2[i]));
}

const total_distance = distances.reduce((a, b) => a + b, 0);

console.log(total_distance);

// puzzle part 2 - simialrity score
let sim = 0;

for(let i = 0; i < list1.length; i++){
  const sim_ = list2.filter(num => num === list1[i]).length;
  sim += sim_ * list1[i];
}

console.log(sim);