// load input from file
const fs = require('fs');
// const { report } = require('process');
const input = fs.readFileSync('input', 'utf8').trim().split('\n');

const reports = [];

for(row in input){
  const values = input[row].split(' ').map(Number);
  reports.push(values);
}

let safe = 0;

for(report of reports){
  // do numbers go consitently up or down?
  const diffs = [];
  for(let i = 1; i < report.length; i++){
    diffs.push(report[i] - report[i-1]);
  }

  const allInRange = diffs.every((val, i, arr) => Math.abs(val) >= 1 && Math.abs(val) <= 3);
  const allPos = diffs.every((val, i, arr) => val > 0);
  const allNeg = diffs.every((val, i, arr) => val < 0);

  if(allInRange && (allPos || allNeg)){
    safe++;
    // console.log(report, diffs, allInRange, allPos, allNeg, true);
  }else{
    // console.log(report, diffs, allInRange, allPos, allNeg, false);
  }
}

// part 2
// we can remove a level to make it save

const isSafe = (report) => {
  const diffs = [];
  for(let i = 1; i < report.length; i++){
    diffs.push(report[i] - report[i-1]);
  }

  const allInRange = diffs.every((val, i, arr) => Math.abs(val) >= 1 && Math.abs(val) <= 3);
  const allPos = diffs.every((val, i, arr) => val > 0);
  const allNeg = diffs.every((val, i, arr) => val < 0);

  if(allInRange && (allPos || allNeg)){
    return true;
  }else{
    return false;
  }
}

let safe_bar_one = 0;

for(report of reports){
  // go through each report if not safe, try removing one element until it is safe, if never safe ignore it.
  if(isSafe(report)){
    safe_bar_one++;
  }else{
    if(isSafe(report.slice(1))){
      safe_bar_one++;
      continue;
    }
    for(let i = 1; i < report.length; i++){
      const newReport = report.slice(0, i).concat(report.slice(i+1));
      if(isSafe(newReport)){
        safe_bar_one++;
        break;
      }

    }
  }
}

console.log(safe);
console.log(safe_bar_one);