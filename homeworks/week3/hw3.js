function IsPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
console.log(IsPrime(2));
console.log(IsPrime(1));
console.log(IsPrime(5));
console.log(IsPrime(37));
