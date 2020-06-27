const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    const [a, b, k] = input[i].split(' ');
    // eslint-disable-next-line
    if (BigInt(a) === BigInt(b)) {
      console.log('DRAW');
    // eslint-disable-next-line
    } else if ((BigInt(a) > BigInt(b) && k == 1) || (BigInt(a) < BigInt(b) && k == -1)) {
      console.log('A');
    } else {
      console.log('B');
    }
  }
}
rl.on('close', () => {
  solve(lines);
});
