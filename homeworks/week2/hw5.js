function join(arr, concatStr) {
  if(arr.length === 0) {
    return ''
  }
  let firstStr = arr[0]
  let result = ''
  for (let i = 1; i < arr.length; i++) {
      result += concatStr+arr[i]
  }
    return firstStr + result ;
}

function repeat(str, times) {
  let result = ''
  for (let i = 1; i <= times; i++) {
      result += str
  }
  return result ;
}

console.log(join(["a", "b", "c"], "!"));
console.log(repeat('a', 5));
