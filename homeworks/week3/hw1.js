function repeat(str, n) {
  let result = '';
  for (let i = 1; i <= n; i += 1) {
    result += str;
  }
  return result;
}
function star(n) {
  for (let i = 1; i <= n; i += 1) {
    console.log(repeat('*', i));
  }
}
star(5);
