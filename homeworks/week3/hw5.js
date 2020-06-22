function solve(lines) {
  const [a, b, k] = lines;
  // eslint-disable-next-line
  if (BigInt(a) === BigInt(b)) {
    console.log('DRAW');
  // eslint-disable-next-line
  } else if (BigInt(a) > BigInt(b) && k == 1 || BigInt(a) < BigInt(b) && k == -1) {
    console.log('A');
  } else {
    console.log('B');
  }
}
solve([1, 2, 1]);
solve([1, 2, -1]);
solve([2, 2, 1]);
