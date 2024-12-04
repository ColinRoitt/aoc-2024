const fs = require("fs");

fs.readFile("input", "utf8", (err, data) => {
    const grid = data.trim().split("\n").map(line => line.split(""));
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [0, 1],   // Right
        [1, 0],   // Down
        [1, 1],   // Down-Right
        [1, -1],  // Down-Left
        [0, -1],  // Left
        [-1, 0],  // Up
        [-1, -1], // Up-Left
        [-1, 1],  // Up-Right
    ];
    let count = 0;

    const isMatch = (x, y, dx, dy) => {
      for (let i = 0; i < "XMAS".length; i++) {
        const nx = x + dx * i;
        const ny = y + dy * i;
        if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] !== "XMAS"[i]) {
          return false;
        }
      }
      return true;
    }

    // Go through each letter
    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
      // check if each direaction is a match
        for (const [dx, dy] of directions) {
          if (isMatch(x, y, dx, dy)) {
            count++;
          }
        }
      }
    }

    console.log("Total occurrences of XMAS:", count);

    // part 2 
    // reset count
    count = 0;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (grid[x][y] !== "A") {
            continue;
        }
        if (x === 0 || y === 0 || x === rows - 1 || y === cols - 1) {
            continue;
        }
        
        console.log(
          grid[x - 1][y - 1],
          grid[x - 1][y],
          grid[x - 1][y + 1]
        );

        console.log(
          grid[x][y - 1],
          grid[x][y],
          grid[x][y + 1]
        );

        console.log(
          grid[x + 1][y - 1],
          grid[x + 1][y],
          grid[x + 1][y + 1]
        );

        const isTopLeftM = grid[x - 1][y - 1] === 'M';
        const isTopLeftS = grid[x - 1][y - 1] === "S";
        const isTopRightM = grid[x - 1][y + 1] === 'M';
        const isTopRightS = grid[x - 1][y + 1] === "S";
        const isBottomLeftM = grid[x + 1][y - 1] === 'M';
        const isBottomLeftS = grid[x + 1][y - 1] === "S";
        const isBottomRightM = grid[x + 1][y + 1] === 'M';
        const isBottomRightS = grid[x + 1][y + 1] === "S";

        const diag1 = (isTopLeftM && isBottomRightS )|| (isTopLeftS && isBottomRightM);
        const diag2 = (isTopRightM && isBottomLeftS )|| (isTopRightS && isBottomLeftM);


        if (diag1 && diag2) {
            count++;
            console.log("found");
        }else{
          console.log("nope");
        }
      }
    }

    console.log("Total X-MAS patterns:", count);
});