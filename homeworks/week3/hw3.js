const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});
function IsPrime(n) {
  if (n === 1) return 'Composite';
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return 'Composite';
    }
  }
  return 'Prime';
}
function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    console.log(IsPrime(Number(input[i])));
  }
}
rl.on('close', () => {
  solve(lines);
});
