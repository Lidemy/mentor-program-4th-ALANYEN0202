const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  let result = '';
  const str = input[0];
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  console.log(result === str ? 'True' : 'False');
}
rl.on('close', () => {
  solve(lines);
});
