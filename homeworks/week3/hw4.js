function isReverseStr(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  console.log(result === str ? 'True' : 'False');
}
isReverseStr('abccba');
isReverseStr('aba');
isReverseStr('abaa');
isReverseStr('');
