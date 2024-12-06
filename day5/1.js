const fs = require("fs");
const rules = fs.readFileSync("rules", "utf8").trim().split("\n").map((r) => r.split("|"));

fs.readFile("input", "utf8", (err, data) => {
  const updates = data.trim().split("\n").map(line => line.split(","));

  console.log(updates.length);

  const validUpdates = [];
  const invalidUpdates = [];

  for(let i = 0; i < updates.length; i++) {
    const update = updates[i];
    let isValid = true;
    for(let j = 0; j < rules.length; j++) {
      // does update contain both numbers in rule
      if (update.includes(rules[j][0]) && update.includes(rules[j][1])) {
        // does rule element 0 appear in the update before element 1
        const index0 = update.indexOf(rules[j][0]);
        const index1 = update.indexOf(rules[j][1]);
        if (!(index0 < index1)) {
          isValid = false;
        }
      }
    }
    if (isValid) {
      validUpdates.push(update);
    }else{
      invalidUpdates.push(update);
    }
  }

  console.log(validUpdates.length);
  const middlePages = validUpdates.map(update => update[Math.floor(update.length / 2)]);
  console.log("sum of middle pages", middlePages.reduce((acc, val) => acc + parseInt(val), 0));


  // part 2
  // take all the invalid updates and order them based on the rules

  const orderedUpdates = invalidUpdates.map(update => {
    let ordered = [...update];
    
    // sort based on rules
    ordered.sort((a, b) => {
      // find the rule that contains both a and b
      const rule = rules.find(rule => rule.includes(a) && rule.includes(b));
      if (!rule) {
        return 0;
      }
      // if a is rule[0] and b is rule[1], return -1 else if a is rule[1] and b is rule[0], return 1
      if (a === rule[0] && b === rule[1]) {
        return -1;
      }else if (a === rule[1] && b === rule[0]) {
        return 1;
      }
      return 0;
    });

    return ordered;
  });

  const orderedMiddlePages = orderedUpdates.map(update => update[Math.floor(update.length / 2)]);
  console.log("sum of ordered middle pages", orderedMiddlePages.reduce((acc, val) => acc + parseInt(val), 0));

});