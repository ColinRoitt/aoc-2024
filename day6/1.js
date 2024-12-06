const fs = require("fs");
let grid = fs.readFileSync("input", "utf8").trim().split("\n").map((line) => line.split(""));

// let grid = "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...".split("\n").map((line) => line.split(""));

const isNextStepBlocked = (x, y, dir, gridToSearch) => {
  // if (x < 0 || x > gridToSearch[0].length || y < 0 || y > gridToSearch.length) {
  //   return false;
  // }
  // console.log(x, y, gridToSearch[0].length, gridToSearch.length);
  // console.log(gridToSearch[y + 1]);
  try {
    switch (dir) {
      case "up":
        return gridToSearch[y - 1][x] === "#" || gridToSearch[y - 1][x] === "O";
      case "down":
        return gridToSearch[y + 1][x] === "#" || gridToSearch[y + 1][x] === "O";
      case "left":
        return gridToSearch[y][x - 1] === "#" || gridToSearch[y][x - 1] === "O";
      case "right":
        return gridToSearch[y][x + 1] === "#" || gridToSearch[y][x + 1] === "O";
    }
  } catch (error) {
    return false;
  }
};

// until guard goes out of range of the grid follow the steps
// If there is something directly in front of you, turn right 90 degrees.
// Otherwise, take a step forward.

// find xy pos of guard at ^ 
let guardY = grid.filter((row) => row.includes("^"));
let guardX = grid[grid.indexOf(guardY[0])].indexOf("^");
guardY = grid.indexOf(guardY[0]);

let guard = {x: guardX, y: guardY, dir: "up"};

do {
  if (isNextStepBlocked(guard.x, guard.y, guard.dir, grid)) {
    switch (guard.dir) {
      case "up":
        guard.dir = "right";
        break;
      case "right":
        guard.dir = "down";
        break;
      case "down":
        guard.dir = "left";
        break;
      case "left":
        guard.dir = "up";
        break;
    }
  }else{
    switch (guard.dir) {
      case "up":
        guard.y--;
        break;
      case "right":
        guard.x++;
        break;
      case "down":
        guard.y++;
        break;
      case "left":
        guard.x--;
        break;
    }
    // set grid marker to X
    try {
      grid[guard.y][guard.x] = "X";
    } catch (error) {
      // this is fine
    }
  }
} while (guard.x >= 0 && guard.x < grid[0].length && guard.y >= 0 && guard.y < grid.length);

// count the number of X's
let count = 0;
grid.forEach((row) => row.forEach((cell) => count += cell === "X" || cell === "^" ? 1 : 0));
console.log(count);

// part 2

grid = fs.readFileSync("input", "utf8").trim().split("\n").map((line) => line.split(""));

// grid = "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...".split("\n").map((line) => line.split(""));

// find xy pos of guard at ^ 
guardY = grid.filter((row) => row.includes("^"));
guardX = grid[grid.indexOf(guardY[0])].indexOf("^");
guardY = grid.indexOf(guardY[0]);

guard = {x: guardX, y: guardY, dir: "up"};
let loopingCounter = 0;

// try placing a O at each . in the grid, see if that version of the grid loops and add up the number of options that loops.
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === ".") {
      // Create a copy of the grid with an O at the current position
      let newGrid = grid.map(row => row.slice());
      newGrid[y][x] = "O";
      // Reset guard position and direction
      guard = { x: guardX, y: guardY, dir: "up" };
      let steps = 0;

      do {
        steps++;
        if (steps > grid.length * grid[0].length) {
          // yeah okay we're gunna cheese this one...
          // lord forgive me for I have abandoned the path of the righteous
          loopingCounter++;
          break;
        }
        if (isNextStepBlocked(guard.x, guard.y, guard.dir, newGrid)) {
          // if current cell is already a + it means we have already applied turn rule here. So we have looped
          // if (newGrid[guard.y][guard.x] === "+") {
          //   loopingCounter += 1;s
          //   console.log("is next step blocked", isNextStepBlocked(guard.x, guard.y, guard.dir, newGrid), guard.x, guard.y, guard.dir);
          //   newGrid.forEach((row) => console.log(row.join("")));
          //   break;
          // }
          switch (guard.dir) {
            case "up":
              guard.dir = "right";
              break;
            case "right":
              guard.dir = "down";
              break;
            case "down":
              guard.dir = "left";
              break;
            case "left":
              guard.dir = "up";
              break;
          }
        }else{
          switch (guard.dir) {
            case "up":
              guard.y--;
              break;
            case "right":
              guard.x++;
              break;
            case "down":
              guard.y++;
              break;
            case "left":
              guard.x--;
              break;
          }
        }
        // set newGrid marker to X
        try {
          // implement new markers. if going up or down, set to |, if going left or right, set to -, if going up or down and left or right, set to +
          let currCell = newGrid[guard.y][guard.x];
          if(currCell == "."){
            if (guard.dir === "up" || guard.dir === "down") {
              newGrid[guard.y][guard.x] = "|";
            } else if (guard.dir === "left" || guard.dir === "right") {
              newGrid[guard.y][guard.x] = "-";
            }
          }else if(currCell == "|"){
            if (guard.dir === "left" || guard.dir === "right") {
              newGrid[guard.y][guard.x] = "+";
            }
          }
          else if(currCell == "-"){
            if (guard.dir === "up" || guard.dir === "down") {
              newGrid[guard.y][guard.x] = "+";
            }
          }
        } catch (error) {
          // this is fine
        }
      } while (guard.x >= 0 && guard.x < newGrid[0].length && guard.y >= 0 && guard.y < newGrid.length);
    }
  }
}

console.log("Number of looping options:", loopingCounter);