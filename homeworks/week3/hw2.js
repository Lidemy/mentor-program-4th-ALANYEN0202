function digits(n) {
  let dig = 0;
  let rbn = n;
  while (rbn > 0) {
    rbn = Math.floor(rbn / 10);
    dig += 1;
  }
  return dig;
}
function Narcissistic(n) {
  const dig = digits(n);
  let sum = 0;
  let rn = n;
  while (rn > 0) {
    const num = rn % 10;
    sum += num ** dig;
    rn = Math.floor(rn / 10);
  }
  return sum === n;
}
function solve(n, m) {
  for (let i = n; i <= m; i += 1) {
    if (Narcissistic(i)) {
      console.log(i);
    }
  }
}
solve(5, 200);
