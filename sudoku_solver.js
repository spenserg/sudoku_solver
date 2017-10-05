var readline = require('readline');

function add(a, b) {
  return a + b;
}

function new_board() {
  var result = [];
  for (var i = 0; i < 81; i++) {
    result[i] = [1,1,1,1,1,1,1,1,1];
  }
  return result;
}

function solve(input) {
  var result = "===\n";
  var config = new_board();
  var nums = "123456789";

  for (var i = 0; i < 81; i++) {
    if (nums.includes(input[i])) {
      config[i] = [0,0,0,0,0,0,0,0,0];
      config[i][input[i] - 1] = 1;
    } else {
      config[i] = [1,1,1,1,1,1,1,1,1]
    }
  }

  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < 81; i++) {
      if (config[i].reduce(add, 0) != 1) {
        var tl = Math.floor(i/27)*27 + Math.floor(Math.floor(i%9)/3)*3;
        for (var j = 0; j < 9; j++) {
          if (config[j*9 + i%9].reduce(add, 0) == 1 && (j*9 + i%9) != i) {
            for (var k = 0; k < 9; k++) {
              if (config[j*9 + i%9][k] == 1 && config[i][k] != 0) {
                config[i][k] = 0;
                done = false;
              }
            }
          }
          if (config[Math.floor(i/9)*9 + j].reduce(add, 0) == 1 && (Math.floor(i/9)*9 + j) != i) {
            for (var k = 0; k < 9; k++) {
              if (config[Math.floor(i/9)*9 + j][k] == 1 && config[i][k] != 0) {
                config[i][k] = 0;
                done = false;
              }
            }
          }
          if (config[tl + Math.floor(j/3)*9 + j%3].reduce(add, 0) == 1 &&
             (tl + Math.floor(j/3)*9 + j%3) != i) {
            for (var k = 0; k < 9; k++) {
              if (config[tl + Math.floor(j/3)*9 + j%3][k] == 1 && config[i][k] != 0) {
                config[i][k] = 0;
                done = false;
              }
            }
          }
        }
      }
    }
  }

  for (var i = 0; i < config.length; i++) {
    if (i != 0) {
      if (i % 9 == 0) {
        result += "\n";
        if (i % 27 == 0) {
          result += "---------------\n";
        }
      } else if (i % 3 == 0) {
        result += " | ";
      }
    }
    if (config[i].reduce(add, 0) == 1) {
      for (var j = 0; j < 9; j++) {
        if (config[i][j] == 1) {
          result += j + 1;
        }
      }
    } else {
      result += "?";
    }
  }
  return result;
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("config: (Use '0' or '.' for blanks)\n", function(answer) {
  var fail = "";
  if (answer.length != 81) {
    fail = "Input must be 81 characters long.";
  } else {
    var num = "1234567890.";
    for (var i = 0; i < answer.length; i++) {
      if (!num.includes(answer[i])) {
        fail = "Numbers only.";
      }
    }
  }
  if (fail) {
    console.log("Invalid input. " + fail);
  } else {
    console.log(solve(answer));
  }
   rl.close();
});
