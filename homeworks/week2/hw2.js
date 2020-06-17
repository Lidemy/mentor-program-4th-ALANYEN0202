function capitalize(str) {
 let firstStr = str[0].toUpperCase()
for(let i = 1; i<str.length; i++) {
  firstStr += str[i]
}
return firstStr
}

console.log(capitalize('hello'));
