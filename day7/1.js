const fs = require("fs");
let equations = fs.readFileSync("input", "utf8").trim().split("\n").map((line) => line.replace(":", "").split(" ").map(Number));

let total = 0;
console.time("part 1");

for(let i = 0; i < equations.length; i++) {
  let expectedResult = equations[i][0];
  let operands = equations[i].slice(1);
  const possibleOperators = ["+", "*"]
  // try all possible operators in all possible positions on equation until we find the correct one. if never found skip it. 
  const numberOfSpacesForOperators = operands.length - 1;
  const numberOfCombinations = Math.pow(possibleOperators.length, numberOfSpacesForOperators);
  let combinations = [];
  for(let j = 0; j < numberOfCombinations; j++) {
    let combination = [];
    let temp = j;
    for(let k = 0; k < numberOfSpacesForOperators; k++) {
      combination.push(possibleOperators[temp % possibleOperators.length]);
      temp = Math.floor(temp / possibleOperators.length);
    }
    combinations.push(combination);
  }

  for(combo of combinations) {
    // zip operands and operators
    let equation = operands.map((operand, index) => {
      if(index < operands.length - 1) {
        return [operand, combo[index]];
      } else {
        return operand;
      }
    }).flat();

    let result = equation[0];
    for(let j = 1; j < equation.length; j += 2) {
      if(equation[j] === "+") {
        result += equation[j + 1];
      } else {
        result *= equation[j + 1];
      }
    }

    if(result === expectedResult) {
      total += result;
      break;
    }
  }
}

console.log("part 1 total:", total); 

console.timeEnd("part 1");
console.time("part 2");

// Part 2.

total = 0;

for(let i = 0; i < equations.length; i++) {
  let expectedResult = equations[i][0];
  let operands = equations[i].slice(1);
  const possibleOperators = ["+", "*", "||"]
  // try all possible operators in all possible positions on equation until we find the correct one. if never found skip it. 
  const numberOfSpacesForOperators = operands.length - 1;
  const numberOfCombinations = Math.pow(possibleOperators.length, numberOfSpacesForOperators);
  let combinations = [];
  
  for(let j = 0; j < numberOfCombinations; j++) {
    let combination = [];
    let temp = j;
    for(let k = 0; k < numberOfSpacesForOperators; k++) {
      combination.push(possibleOperators[temp % possibleOperators.length]);
      temp = Math.floor(temp / possibleOperators.length);
    }
    combinations.push(combination);
  }

  for(combo of combinations) {
    // zip operands and operators
    let equation = operands.map((operand, index) => {
      if(index < operands.length - 1) {
        return [operand, combo[index]];
      } else {
        return operand;
      }
    }).flat();

    let result = equation[0];
    for(let j = 1; j < equation.length; j += 2) {
      if(equation[j] === "+") {
        result += equation[j + 1];
      } else if(equation[j] === "*") {
        result *= equation[j + 1];
      } else if(equation[j] === "||") {
        result = parseInt(result.toString() + equation[j + 1].toString());
      }
    }

    if(result === expectedResult) {
      total += result;
      break;
    }
  }
}

console.log("part 2 total:", total); 
console.timeEnd("part 2");